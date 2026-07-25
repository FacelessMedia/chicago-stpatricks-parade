import { NextRequest, NextResponse } from "next/server";
import { createRecord, TABLES } from "@/lib/airtable";
import { sendTemplatedEmail, detailsTable } from "@/lib/email";
import { PARADE_INFO, PACKAGES, ALA_CARTE_ITEMS } from "@/lib/data";
import { isRegistrationOpen } from "@/lib/season";
import { createCheckoutSession } from "@/lib/stripe";

const COMMITTEE_EMAIL = process.env.COMMITTEE_EMAIL || "parade@chicagostpatricksdayparade.org";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type RegistrationPayload = {
  orgName?: string;
  address?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  packageType?: string;
  selectedPackage?: string;
  paradeEntry?: boolean;
  unitDescription?: string;
  marchers?: string;
  useFloat?: boolean;
  floatCompany?: string;
  numVehicles?: string;
  vehicleDescription?: string;
  unitMarshal1?: string;
  unitMarshal2?: string;
  hasBand?: boolean;
  bandName?: string;
  bandDirector?: string;
  bandEmail?: string;
  bandApproved?: boolean;
  adSize?: string;
  bannerName?: string;
  bannerQty?: number;
  grandstandQty?: number;
  cbcSeats?: number;
  cbcTables?: number;
  raffleQty?: number;
  lapelPinQty?: number;
  donationAmount?: number;
};

type OrderLine = {
  id: string;
  name: string;
  description: string;
  unitAmount: number;
  quantity: number;
  total: number;
};

function quantity(value: number | undefined, max: number): number {
  const parsed = Math.floor(Number(value) || 0);
  return Math.max(0, Math.min(max, parsed));
}

export async function POST(req: NextRequest) {
  if (!isRegistrationOpen()) {
    return NextResponse.json(
      { ok: false, error: "Registration is currently closed for the season." },
      { status: 403 }
    );
  }

  let body: RegistrationPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const orgName = (body.orgName || "").trim();
  const fullName = (body.fullName || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const packageType = body.packageType === "package" ? "package" : body.packageType === "alacarte" ? "alacarte" : "";
  const selectedPackage = packageType === "package" ? PACKAGES.find((item) => item.id === body.selectedPackage) : undefined;
  const bannerQty = packageType === "package" ? 1 : quantity(body.bannerQty, 10);
  const grandstandQty = packageType === "alacarte" ? quantity(body.grandstandQty, 50) : 0;
  const cbcSeats = packageType === "alacarte" ? quantity(body.cbcSeats, 9) : 0;
  const cbcTables = packageType === "alacarte" ? quantity(body.cbcTables, 10) : 0;
  const raffleQty = packageType === "alacarte" ? quantity(body.raffleQty, 10) : 0;
  const lapelPinQty = packageType === "alacarte" ? quantity(body.lapelPinQty, 50) : 0;
  const donationAmount = packageType === "alacarte" ? quantity(body.donationAmount, 100000) : 0;
  const validAdIds = ["ad-full-color", "ad-full-bw", "ad-half-bw"];
  const selectedAdId = packageType === "package"
    ? selectedPackage?.id === "premier" ? "ad-full-bw" : selectedPackage ? "ad-full-color" : ""
    : validAdIds.includes(body.adSize || "") ? body.adSize || "" : "";
  const orderLines: OrderLine[] = [];
  const addItem = (id: string, itemQuantity: number) => {
    const item = ALA_CARTE_ITEMS.find((candidate) => candidate.id === id);
    if (!item || itemQuantity < 1) return;
    orderLines.push({
      id: item.id,
      name: item.name,
      description: item.description,
      unitAmount: item.price * 100,
      quantity: itemQuantity,
      total: item.price * itemQuantity,
    });
  };

  if (selectedPackage) {
    orderLines.push({
      id: selectedPackage.id,
      name: selectedPackage.name,
      description: selectedPackage.features.join("; "),
      unitAmount: selectedPackage.price * 100,
      quantity: 1,
      total: selectedPackage.price,
    });
  } else if (packageType === "alacarte") {
    addItem("parade-entry", body.paradeEntry ? 1 : 0);
    addItem(selectedAdId, selectedAdId ? 1 : 0);
    addItem("cbc-seat", cbcSeats);
    addItem("cbc-table", cbcTables);
    addItem("grandstand", grandstandQty);
    addItem("light-pole-banner", bannerQty);
    addItem("raffle", raffleQty);
    addItem("lapel-pin", lapelPinQty);
    if (donationAmount > 0) {
      orderLines.push({
        id: "donation",
        name: "Parade Donation",
        description: "Contribution supporting the parade and its ongoing traditions",
        unitAmount: donationAmount * 100,
        quantity: 1,
        total: donationAmount,
      });
    }
  }

  const errors: string[] = [];
  if (!orgName) errors.push("Organization name is required.");
  if (!fullName) errors.push("Contact name is required.");
  if (!email || !isValidEmail(email)) errors.push("A valid email is required.");
  if (!phone) errors.push("Phone number is required.");
  if (!packageType) errors.push("Choose a package or à la carte items.");
  if (packageType === "package" && !selectedPackage) errors.push("Choose a valid package.");
  if (packageType === "alacarte" && orderLines.length === 0) errors.push("Choose at least one à la carte item.");
  if (body.paradeEntry && !(body.unitDescription || "").trim()) errors.push("Unit description is required for parade entries.");
  if (bannerQty > 0 && !(body.bannerName || "").trim()) errors.push("A light pole banner name is required.");
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, error: errors.join(" ") }, { status: 400 });
  }

  const total = orderLines.reduce((sum, line) => sum + line.total, 0);
  const totalLabel = `$${total.toLocaleString("en-US")}.00`;
  const selectedAd = ALA_CARTE_ITEMS.find((item) => item.id === selectedAdId);
  const packageLabel = selectedPackage ? `${selectedPackage.name} (${selectedPackage.priceLabel})` : "À la carte";
  const selectionRows: Array<[string, string | number]> = orderLines.map((line) => [
    line.name,
    `${line.quantity} × $${(line.unitAmount / 100).toLocaleString("en-US")} = $${line.total.toLocaleString("en-US")}`,
  ]);

  try {
    const record = await createRecord(TABLES.registrations, {
      "Organization Name": orgName,
      Address: (body.address || "").trim(),
      "Contact Name": fullName,
      Email: email,
      Phone: phone,
      "Registration Type": packageType === "package" ? "Package" : "A La Carte",
      Package: selectedPackage?.name || "",
      "Package Price": selectedPackage?.price || 0,
      "Parade Entry": Boolean(body.paradeEntry),
      "Unit Description": (body.unitDescription || "").trim(),
      Marchers: (body.marchers || "").trim(),
      "Using Float Company": Boolean(body.useFloat),
      "Float Company": (body.floatCompany || "").trim(),
      "Number of Vehicles": (body.numVehicles || "").trim(),
      "Vehicle Description": (body.vehicleDescription || "").trim(),
      "Unit Marshal 1": (body.unitMarshal1 || "").trim(),
      "Unit Marshal 2": (body.unitMarshal2 || "").trim(),
      "Band Name": (body.bandName || "").trim(),
      "Band Director": (body.bandDirector || "").trim(),
      "Band Email": (body.bandEmail || "").trim(),
      "Ad Size": selectedAd?.name || "",
      "Banner Name": (body.bannerName || "").trim(),
      "Banner Quantity": bannerQty,
      "CBC Seats": cbcSeats,
      "CBC Tables": packageType === "package" ? 1 : cbcTables,
      "Grandstand Seats": grandstandQty,
      "Raffle Tickets": raffleQty,
      "Lapel Pins": lapelPinQty,
      "Donation Amount": donationAmount,
      "Order Total": total,
      Selections: selectionRows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      Status: "New — Pending Review",
      Year: PARADE_INFO.year,
      "Submitted At": new Date().toISOString(),
    });

    let raffleRecordId = "";
    if (raffleQty > 0) {
      const raffleRecord = await createRecord(TABLES.raffle, {
        Item: "Raffle Tickets",
        "Item ID": "raffle",
        Quantity: raffleQty,
        "Unit Price": 100,
        Total: raffleQty * 100,
        Name: fullName,
        Email: email,
        Phone: phone,
        Note: `Combined registration ${record.id}`,
        Status: "Pending Payment",
        Year: PARADE_INFO.year,
        "Submitted At": new Date().toISOString(),
      });
      raffleRecordId = raffleRecord.id;
    }

    const checkout = await createCheckoutSession({
      lineItems: orderLines.map((line) => ({
        name: line.name,
        description: line.description,
        unitAmount: line.unitAmount,
        quantity: line.quantity,
      })),
      customerEmail: email,
      reference: record.id,
      successPath: "/register",
      cancelPath: "/register",
      metadata: {
        table: TABLES.registrations,
        recordId: record.id,
        itemId: selectedPackage?.id || "registration",
        itemName: selectedPackage?.name || "Parade registration",
        ...(raffleRecordId ? {
          relatedTable: TABLES.raffle,
          relatedRecordId: raffleRecordId,
          relatedAmount: String(raffleQty * 100),
        } : {}),
      },
    });

    const selections: Array<[string, string | number]> = [
      ["Organization", orgName],
      ["Selection", packageLabel],
      ...selectionRows,
      ["Total", totalLabel],
      ["Parade Entry", body.paradeEntry ? "Yes" : "No"],
      ["Unit Description", (body.unitDescription || "").trim()],
      ["Ad Book", selectedAd?.name || "Not selected"],
      ["Light Pole Banner", bannerQty > 0 ? (body.bannerName || "").trim() : "Not selected"],
    ];

    void sendTemplatedEmail({
      to: email,
      templateKey: "registration_confirmation",
      vars: {
        contactName: fullName.split(" ")[0] || fullName,
        orgName,
        year: PARADE_INFO.year,
        reference: record.id,
        selectionsHtml: detailsTable(selections),
        paymentNote: checkout ? "; complete secure checkout to confirm payment" : " and arrange payment",
      },
    });
    void sendTemplatedEmail({
      to: COMMITTEE_EMAIL,
      templateKey: "committee_notification",
      vars: {
        kind: "parade registration",
        summary: `${orgName} — ${packageLabel} — ${totalLabel}`,
        reference: record.id,
        selectionsHtml: detailsTable([
          ...selections,
          ["Contact", fullName],
          ["Email", email],
          ["Phone", phone],
        ]),
      },
    });

    return NextResponse.json({
      ok: true,
      reference: record.id,
      total,
      totalLabel,
      checkoutUrl: checkout?.url || null,
      mode: checkout ? "stripe" : "invoice",
    });
  } catch (err) {
    console.error("[api/register] failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong saving your registration. Please try again or contact us." },
      { status: 500 }
    );
  }
}
