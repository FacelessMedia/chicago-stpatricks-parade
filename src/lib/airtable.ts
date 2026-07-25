/**
 * Airtable data layer — the CMS backbone.
 *
 * All committee-editable content (products, parade year info, sponsors,
 * email templates) lives in Airtable. This module reads/writes via the
 * Airtable REST API with NO SDK dependency.
 *
 * Graceful degradation: when AIRTABLE_API_KEY / AIRTABLE_BASE_ID are not
 * configured, reads fall back to the static data in `data.ts` and writes
 * are logged to the server console — so the site works end-to-end in
 * development and flips to live data the moment env vars are added.
 */

const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const API_URL = "https://api.airtable.com/v0";

/** Tables the site expects in the Airtable base. */
export const TABLES = {
  registrations: process.env.AIRTABLE_TABLE_REGISTRATIONS || "Registrations",
  orders: process.env.AIRTABLE_TABLE_ORDERS || "Orders",
  raffle: process.env.AIRTABLE_TABLE_RAFFLE || "Raffle Tickets",
  contacts: process.env.AIRTABLE_TABLE_CONTACTS || "Contact Messages",
  products: process.env.AIRTABLE_TABLE_PRODUCTS || "Products",
  paradeYears: process.env.AIRTABLE_TABLE_PARADE_YEARS || "Parade Years",
  sponsors: process.env.AIRTABLE_TABLE_SPONSORS || "Sponsors",
  emailTemplates: process.env.AIRTABLE_TABLE_EMAIL_TEMPLATES || "Email Templates",
  emailLog: process.env.AIRTABLE_TABLE_EMAIL_LOG || "Email Log",
} as const;

export function isAirtableConfigured(): boolean {
  return Boolean(API_KEY && BASE_ID);
}

type AirtableRecord<T> = { id: string; createdTime: string; fields: T };

async function airtableFetch<T>(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number } }
): Promise<T> {
  const res = await fetch(`${API_URL}/${BASE_ID}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Airtable ${init?.method || "GET"} ${path} failed (${res.status}): ${body}`);
  }
  return res.json() as Promise<T>;
}

/**
 * List records from a table. Server-side only.
 * Uses Next.js fetch caching (revalidate) so Airtable rate limits are never hit.
 */
export async function listRecords<T>(
  table: string,
  opts?: { view?: string; filterByFormula?: string; maxRecords?: number; revalidate?: number }
): Promise<AirtableRecord<T>[]> {
  if (!isAirtableConfigured()) return [];
  const params = new URLSearchParams();
  if (opts?.view) params.set("view", opts.view);
  if (opts?.filterByFormula) params.set("filterByFormula", opts.filterByFormula);
  if (opts?.maxRecords) params.set("maxRecords", String(opts.maxRecords));

  const records: AirtableRecord<T>[] = [];
  let offset: string | undefined;
  do {
    if (offset) params.set("offset", offset);
    const page = await airtableFetch<{ records: AirtableRecord<T>[]; offset?: string }>(
      `${encodeURIComponent(table)}?${params.toString()}`,
      { next: { revalidate: opts?.revalidate ?? 300 } }
    );
    records.push(...page.records);
    offset = page.offset;
  } while (offset);
  return records;
}

/**
 * Create a record. When Airtable is not configured, logs the payload and
 * returns a locally generated reference so calling flows still succeed.
 */
export async function createRecord<T extends Record<string, unknown>>(
  table: string,
  fields: T
): Promise<{ id: string; offline: boolean }> {
  if (!isAirtableConfigured()) {
    const ref = `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    console.log(`[airtable:offline] would create in "${table}":`, JSON.stringify(fields, null, 2));
    return { id: ref, offline: true };
  }
  const res = await airtableFetch<{ id: string }>(encodeURIComponent(table), {
    method: "POST",
    body: JSON.stringify({ fields, typecast: true }),
  });
  return { id: res.id, offline: false };
}

/** Update fields on an existing record. No-op (logged) when offline. */
export async function updateRecord<T extends Record<string, unknown>>(
  table: string,
  recordId: string,
  fields: Partial<T>
): Promise<void> {
  if (!isAirtableConfigured()) {
    console.log(`[airtable:offline] would update "${table}"/${recordId}:`, JSON.stringify(fields));
    return;
  }
  await airtableFetch(`${encodeURIComponent(table)}/${recordId}`, {
    method: "PATCH",
    body: JSON.stringify({ fields, typecast: true }),
  });
}

/* ============================================================
 * Typed content accessors (CMS reads with static fallback)
 * ============================================================ */

export type ProductRecord = {
  Name: string;
  Slug: string;
  Category: "package" | "alacarte";
  Description?: string;
  Features?: string;
  Price?: number;
  "Price Label"?: string;
  Active?: boolean;
  "Sold Out"?: boolean;
  "Max Quantity"?: number;
  Deadline?: string;
  "Sort Order"?: number;
  "Stripe Price ID"?: string;
};

export type EmailTemplateRecord = {
  Key: string;
  Subject: string;
  Body: string;
  Active?: boolean;
};

/**
 * Fetch products from Airtable; returns null when not configured so callers
 * can fall back to static data.
 */
export async function fetchProducts(): Promise<AirtableRecord<ProductRecord>[] | null> {
  if (!isAirtableConfigured()) return null;
  try {
    return await listRecords<ProductRecord>(TABLES.products, { revalidate: 300 });
  } catch (err) {
    console.error("[airtable] fetchProducts failed, falling back to static data:", err);
    return null;
  }
}

/** Fetch an active email template by key; null → caller uses built-in default. */
export async function fetchEmailTemplate(key: string): Promise<EmailTemplateRecord | null> {
  if (!isAirtableConfigured()) return null;
  try {
    const records = await listRecords<EmailTemplateRecord>(TABLES.emailTemplates, {
      filterByFormula: `AND({Key} = "${key}", {Active})`,
      maxRecords: 1,
      revalidate: 60,
    });
    return records[0]?.fields ?? null;
  } catch (err) {
    console.error(`[airtable] fetchEmailTemplate(${key}) failed:`, err);
    return null;
  }
}
