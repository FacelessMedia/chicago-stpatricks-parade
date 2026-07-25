/**
 * One-time Airtable base setup — creates the full Phase 2.1 schema and
 * seeds it with the current site data.
 *
 * Idempotent: existing tables are skipped; seeds only run on empty tables.
 *
 * Usage: node scripts/setup-airtable.mjs
 * Reads AIRTABLE_API_KEY + AIRTABLE_BASE_ID from .env.local
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Load env from .env.local (no dependency) ---
const envFile = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
const env = {};
for (const line of envFile.split(/\r?\n/)) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}
const API_KEY = env.AIRTABLE_API_KEY;
const BASE_ID = env.AIRTABLE_BASE_ID;
if (!API_KEY || !BASE_ID) {
  console.error("Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID in .env.local");
  process.exit(1);
}

const META = `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`;
const DATA = `https://api.airtable.com/v0/${BASE_ID}`;
const HEADERS = { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" };

async function api(url, opts = {}) {
  const res = await fetch(url, { ...opts, headers: HEADERS });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${opts.method || "GET"} ${url} → ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

// --- Field shorthands ---
const text = (name) => ({ name, type: "singleLineText" });
const long = (name) => ({ name, type: "multilineText" });
const email = (name) => ({ name, type: "email" });
const phone = (name) => ({ name, type: "phoneNumber" });
const url = (name) => ({ name, type: "url" });
const num = (name) => ({ name, type: "number", options: { precision: 0 } });
const money = (name) => ({ name, type: "currency", options: { precision: 2, symbol: "$" } });
const check = (name) => ({ name, type: "checkbox", options: { icon: "check", color: "greenBright" } });
const date = (name) => ({ name, type: "date", options: { dateFormat: { name: "us" } } });
const dateTime = (name) => ({
  name,
  type: "dateTime",
  options: {
    timeZone: "America/Chicago",
    dateFormat: { name: "us" },
    timeFormat: { name: "12hour" },
  },
});
const select = (name, choices) => ({
  name,
  type: "singleSelect",
  options: { choices: choices.map((c) => ({ name: c })) },
});
const attachments = (name) => ({ name, type: "multipleAttachments" });

const stripeFields = [
  text("Stripe Session ID"),
  text("Stripe Payment Intent"),
  dateTime("Paid At"),
  money("Amount Paid"),
];

// --- Schema (primary field must be first) ---
const TABLES = [
  {
    name: "Parade Years",
    description: "One row per parade season — all year-specific content the committee edits.",
    fields: [
      text("Label"),
      num("Year"),
      text("Theme"),
      date("Parade Date"),
      text("Start Time"),
      text("Route"),
      text("Grand Marshal"),
      long("Grand Marshal Bio"),
      text("Guest of Honor"),
      long("Guest of Honor Bio"),
      text("Queen"),
      long("Queen Court"),
      text("River Dyeing Time"),
      date("Registration Deadline"),
      date("Ad Book Deadline"),
      date("Banner Deadline"),
      date("Grandstand Deadline"),
      select("Season Override", ["auto", "active", "off"]),
      long("Notes"),
    ],
  },
  {
    name: "Products",
    description: "Everything purchasable — packages and à la carte items. Toggle Active/Sold Out any time.",
    fields: [
      text("Name"),
      text("Slug"),
      select("Category", ["package", "alacarte"]),
      long("Description"),
      long("Features"),
      money("Price"),
      text("Price Label"),
      check("Active"),
      check("Sold Out"),
      num("Max Quantity"),
      date("Deadline"),
      num("Sort Order"),
      text("Stripe Price ID"),
    ],
  },
  {
    name: "Sponsors",
    description: "Sponsor wall — name, tier, logo. Only Active sponsors show on the site.",
    fields: [
      text("Name"),
      select("Tier", ["Premier", "Gold", "Silver", "Friend"]),
      url("URL"),
      attachments("Logo"),
      check("Active"),
      num("Sort Order"),
    ],
  },
  {
    name: "Email Templates",
    description: "Edit subject/body any time — the site uses these at send time. {{merge_fields}} get substituted.",
    fields: [
      text("Key"),
      text("Subject"),
      long("Body"),
      long("Variables"),
      check("Active"),
    ],
  },
  {
    name: "Email Log",
    description: "Every email the site sends (or would send) is recorded here.",
    fields: [
      email("To"),
      text("Subject"),
      text("Template"),
      select("Status", ["sent", "failed", "skipped (email not configured)"]),
      long("Error"),
      dateTime("Sent At"),
    ],
  },
  {
    name: "Registrations",
    description: "Parade registrations from the website — the site writes these automatically.",
    fields: [
      text("Organization Name"),
      text("Address"),
      text("Contact Name"),
      email("Email"),
      phone("Phone"),
      select("Registration Type", ["Package", "A La Carte"]),
      text("Package"),
      money("Package Price"),
      check("Parade Entry"),
      long("Unit Description"),
      text("Marchers"),
      check("Using Float Company"),
      text("Float Company"),
      text("Number of Vehicles"),
      long("Vehicle Description"),
      text("Unit Marshal 1"),
      text("Unit Marshal 2"),
      text("Band Name"),
      text("Band Director"),
      email("Band Email"),
      text("Ad Size"),
      text("Banner Name"),
      num("Banner Quantity"),
      num("CBC Seats"),
      num("CBC Tables"),
      num("Grandstand Seats"),
      num("Raffle Tickets"),
      num("Lapel Pins"),
      money("Donation Amount"),
      money("Order Total"),
      long("Selections"),
      select("Status", ["New — Pending Review", "In Review", "Confirmed", "Paid", "Cancelled"]),
      num("Year"),
      dateTime("Submitted At"),
      url("Artwork URL"),
      dateTime("Last Reminder At"),
      ...stripeFields,
    ],
  },
  {
    name: "Orders",
    description: "Grandstand seats, ads, banners — standalone purchases from the website.",
    fields: [
      text("Item"),
      text("Item ID"),
      num("Quantity"),
      money("Unit Price"),
      money("Total"),
      text("Name"),
      email("Email"),
      phone("Phone"),
      long("Note"),
      select("Status", ["Pending Payment", "Paid", "Fulfilled", "Refunded", "Cancelled"]),
      num("Year"),
      dateTime("Submitted At"),
      ...stripeFields,
    ],
  },
  {
    name: "Raffle Tickets",
    description: "Raffle ticket orders — isolated from everything else. 750 max per season.",
    fields: [
      text("Item"),
      text("Item ID"),
      num("Quantity"),
      money("Unit Price"),
      money("Total"),
      text("Name"),
      email("Email"),
      phone("Phone"),
      long("Note"),
      text("Ticket Numbers"),
      text("Seller"),
      select("Status", ["Pending Payment", "Paid", "Cancelled"]),
      num("Year"),
      dateTime("Submitted At"),
      ...stripeFields,
    ],
  },
  {
    name: "Contact Messages",
    description: "Contact form submissions from the website.",
    fields: [
      text("Name"),
      email("Email"),
      phone("Phone"),
      text("Subject"),
      long("Message"),
      select("Status", ["New", "Replied", "Closed"]),
      dateTime("Submitted At"),
    ],
  },
];

// --- Seeds ---
const PRODUCT_SEEDS = [
  { Name: "VIP Shamrock Package", Slug: "vip", Category: "package", Description: "Full VIP sponsorship experience.", Features: "VIP table for 10 at the CBC Dinner\nFull-page color ad\nJumbo screen ad\nParade entry\nLight pole banner\n6 river-dyeing boat tickets", Price: 8500, "Price Label": "$8,500", Active: true, "Sort Order": 1 },
  { Name: "Executive Shamrock Package", Slug: "executive", Category: "package", Description: "Premium sponsorship experience.", Features: "Executive table for 10 at the CBC Dinner\nFull-page color ad\nJumbo screen ad\nParade entry\nLight pole banner\n4 river-dyeing boat tickets", Price: 6500, "Price Label": "$6,500", Active: true, "Sort Order": 2 },
  { Name: "Premier Shamrock Package", Slug: "premier", Category: "package", Description: "Complete parade sponsorship experience.", Features: "Premier table for 10 at the CBC Dinner\nFull-page black & white ad\nJumbo screen ad\nParade entry\nLight pole banner\n2 river-dyeing boat tickets", Price: 4500, "Price Label": "$4,500", Active: true, "Sort Order": 3 },
  { Name: "Parade Entry", Slug: "parade-entry", Category: "alacarte", Description: "Parade unit entry including a half-page black & white ad.", Price: 500, "Price Label": "$500 per entry", Active: true, "Max Quantity": 1, "Sort Order": 10 },
  { Name: "Full Page Color Ad", Slug: "ad-full-color", Category: "alacarte", Description: "Full-page color advertisement in the parade ad book.", Price: 1000, "Price Label": "$1,000", Active: true, "Max Quantity": 5, "Sort Order": 11 },
  { Name: "Full Page Black & White Ad", Slug: "ad-full-bw", Category: "alacarte", Description: "Full-page black & white advertisement in the parade ad book.", Price: 750, "Price Label": "$750", Active: true, "Max Quantity": 5, "Sort Order": 12 },
  { Name: "Half Page Black & White Ad", Slug: "ad-half-bw", Category: "alacarte", Description: "Half-page black & white advertisement in the parade ad book.", Price: 500, "Price Label": "$500", Active: true, "Max Quantity": 5, "Sort Order": 13 },
  { Name: "CBC Dinner Individual Seat", Slug: "cbc-seat", Category: "alacarte", Description: "One individual seat at the Corned Beef & Cabbage Dinner.", Price: 150, "Price Label": "$150 per seat", Active: true, "Max Quantity": 9, "Sort Order": 14 },
  { Name: "CBC Dinner Table", Slug: "cbc-table", Category: "alacarte", Description: "A reserved CBC Dinner table for 10 guests.", Price: 1500, "Price Label": "$1,500 per table", Active: true, "Max Quantity": 10, "Sort Order": 15 },
  { Name: "Grandstand Seats", Slug: "grandstand", Category: "alacarte", Description: "Reserved grandstand seating on Columbus Drive.", Price: 65, "Price Label": "$65 per seat", Active: true, "Max Quantity": 50, "Sort Order": 16 },
  { Name: "Light Pole Banner", Slug: "light-pole-banner", Category: "alacarte", Description: "Your company or family name on a Columbus Drive light pole banner.", Price: 2000, "Price Label": "$2,000 per banner", Active: true, "Max Quantity": 10, "Sort Order": 17 },
  { Name: "Raffle Tickets", Slug: "raffle", Category: "alacarte", Description: "Annual raffle — only 750 tickets sold.", Price: 100, "Price Label": "$100 per ticket", Active: true, "Max Quantity": 10, "Sort Order": 18 },
  { Name: "Parade Lapel Pin", Slug: "lapel-pin", Category: "alacarte", Description: "Official commemorative parade lapel pin.", Price: 15, "Price Label": "$15 per pin", Active: true, "Max Quantity": 50, "Sort Order": 19 },
  { Name: "Parade Donation", Slug: "donation", Category: "alacarte", Description: "A contribution supporting the parade and its traditions.", Price: 1, "Price Label": "Choose your amount", Active: true, "Max Quantity": 100000, "Sort Order": 20 },
];

const TEMPLATE_SEEDS = [
  { Key: "registration_confirmation", Subject: "We received your {{year}} parade registration — {{orgName}}", Body: "<p>Dear {{contactName}},</p>\n<p>Thank you for registering for the {{year}} Chicago St. Patrick's Day Parade! We've received your registration for <strong>{{orgName}}</strong>.</p>\n<p><strong>Your selections:</strong></p>\n{{selectionsHtml}}\n<p><strong>Reference:</strong> {{reference}}</p>\n<p>A member of the parade committee will follow up to confirm details{{paymentNote}}.</p>\n<p>Go raibh maith agat — thank you for being part of the tradition!</p>", Variables: "contactName, orgName, year, reference, selectionsHtml, paymentNote", Active: true },
  { Key: "payment_receipt", Subject: "Receipt — {{itemName}} ({{year}} Chicago St. Patrick's Day Parade)", Body: "<p>Dear {{contactName}},</p>\n<p>We've received your payment. Here's your receipt:</p>\n{{selectionsHtml}}\n<p><strong>Total paid:</strong> {{totalLabel}}<br/><strong>Reference:</strong> {{reference}}</p>\n<p>See you on Parade Day!</p>", Variables: "contactName, itemName, year, reference, totalLabel, selectionsHtml", Active: true },
  { Key: "order_confirmation", Subject: "Order received — {{itemName}} ({{year}} parade)", Body: "<p>Dear {{contactName}},</p>\n<p>We've received your order for <strong>{{itemName}}</strong>.</p>\n{{selectionsHtml}}\n<p><strong>Total:</strong> {{totalLabel}}<br/><strong>Reference:</strong> {{reference}}</p>\n<p>{{paymentNote}}</p>", Variables: "contactName, itemName, quantity, year, reference, totalLabel, selectionsHtml, paymentNote", Active: true },
  { Key: "raffle_confirmation", Subject: "Your raffle ticket order — {{year}} Chicago St. Patrick's Day Parade", Body: "<p>Dear {{contactName}},</p>\n<p>Thank you for supporting the parade! We've received your order for <strong>{{quantity}} raffle ticket(s)</strong>.</p>\n<p><strong>Total:</strong> {{totalLabel}}<br/><strong>Reference:</strong> {{reference}}</p>\n<p>Your official ticket numbers will be emailed to you once your payment is confirmed. Remember — only 750 tickets are sold each year. Good luck!</p>", Variables: "contactName, quantity, year, reference, totalLabel", Active: true },
  { Key: "contact_acknowledgement", Subject: "We got your message — Chicago St. Patrick's Day Parade", Body: "<p>Dear {{contactName}},</p>\n<p>Thanks for reaching out about <strong>{{subject}}</strong>. A member of the parade committee will get back to you shortly.</p>\n<p>Sláinte!</p>", Variables: "contactName, subject", Active: true },
  { Key: "committee_notification", Subject: "[Website] New {{kind}}: {{summary}}", Body: "<p>A new <strong>{{kind}}</strong> just came in through the website:</p>\n{{selectionsHtml}}\n<p><strong>Reference:</strong> {{reference}}</p>", Variables: "kind, summary, reference, selectionsHtml", Active: true },
  { Key: "logo_reminder", Subject: "Reminder: we still need your ad artwork — {{year}} Parade Ad Book", Body: "<p>Dear {{contactName}},</p>\n<p>Friendly reminder that we haven't yet received the ad artwork for <strong>{{orgName}}</strong>.</p>\n<p>The ad book deadline is <strong>{{deadline}}</strong>. Please reply to this email with your high-resolution artwork (PDF, PNG, or JPG).</p>\n<p>Thank you!</p>", Variables: "contactName, orgName, year, deadline", Active: true },
  { Key: "deadline_reminder", Subject: "Deadline approaching: {{deadlineName}} — {{deadline}}", Body: "<p>Dear {{contactName}},</p>\n<p>A quick reminder that the <strong>{{deadlineName}}</strong> deadline is <strong>{{deadline}}</strong>.</p>\n<p>If you've already taken care of this, you can disregard this note. Otherwise, don't miss out!</p>", Variables: "contactName, deadlineName, deadline", Active: true },
];

const YEAR_SEEDS = [
  { Label: "2026 — 71st Annual", Year: 2026, Theme: "Celebrating 71 Years of Irish Heritage", "Parade Date": "2026-03-14", "Start Time": "12:00 PM", Route: "Columbus Drive — Balbo to Monroe", "Grand Marshal": "James T. Glynn", Queen: "Claire Cahill", "River Dyeing Time": "10:00 AM", "Registration Deadline": "2026-02-27", "Ad Book Deadline": "2026-02-20", "Banner Deadline": "2026-02-13", "Grandstand Deadline": "2026-03-09", "Season Override": "auto", Notes: "Completed season — data migrated from the old site." },
  { Label: "2027 — 72nd Annual", Year: 2027, Theme: "To Be Announced", "Season Override": "auto", Notes: "Next season — fill in theme, honorees, and deadlines as they're decided." },
];

const SPONSOR_SEEDS = [
  "Aer Lingus", "BlackRock", "Blue Cross Blue Shield", "Boyd Watterson",
  "CannaCard", "Chicago White Sox", "CN Railway", "Constitution Capital Partners",
  "Country Financial", "Diageo Beer Company", "GW Asset Management",
  "Intercontinental Realty", "Irish Fellowship Club of Chicago", "Janus Henderson",
  "Labor First", "Legacy Professionals", "Marathon Health", "Marquette Associates",
  "Mercedes Benz", "Metra", "Midwest Institutional Trust", "Monster Energy",
  "National Investment Services", "Nuveen", "O'Briens Restaurant", "Segal",
  "Shoreline", "Sopel Foundation for Dyslexia",
].map((name, i) => ({ Name: name, Active: true, "Sort Order": i + 1 }));

async function seed(table, records) {
  const existing = await api(`${DATA}/${encodeURIComponent(table)}?maxRecords=1`);
  if (existing.records.length > 0) {
    console.log(`  seed skipped (${table} already has records)`);
    return;
  }
  for (let i = 0; i < records.length; i += 10) {
    const batch = records.slice(i, i + 10).map((fields) => ({ fields }));
    await api(`${DATA}/${encodeURIComponent(table)}`, {
      method: "POST",
      body: JSON.stringify({ records: batch, typecast: true }),
    });
  }
  console.log(`  seeded ${records.length} records into ${table}`);
}

async function main() {
  console.log(`Setting up base ${BASE_ID}...`);
  const { tables: existing } = await api(META);
  const existingNames = new Set(existing.map((t) => t.name));

  for (const table of TABLES) {
    if (existingNames.has(table.name)) {
      console.log(`✓ ${table.name} (already exists)`);
      continue;
    }
    await api(META, { method: "POST", body: JSON.stringify(table) });
    console.log(`+ created ${table.name}`);
  }

  console.log("\nSeeding...");
  await seed("Products", PRODUCT_SEEDS);
  await seed("Email Templates", TEMPLATE_SEEDS);
  await seed("Parade Years", YEAR_SEEDS);
  await seed("Sponsors", SPONSOR_SEEDS);

  console.log("\nDone. Open the base and take a look:");
  console.log(`https://airtable.com/${BASE_ID}`);
}

main().catch((err) => {
  console.error("SETUP FAILED:", err.message);
  process.exit(1);
});
