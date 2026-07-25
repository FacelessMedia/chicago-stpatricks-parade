import { NextRequest, NextResponse } from "next/server";
import { createRecord, TABLES } from "@/lib/airtable";
import { sendTemplatedEmail, detailsTable } from "@/lib/email";
import { createCheckoutSession, isStripeConfigured } from "@/lib/stripe";
import { PARADE_INFO, ALA_CARTE_ITEMS } from "@/lib/data";
import { isPurchaseOpen } from "@/lib/season";

const COMMITTEE_EMAIL = process.env.COMMITTEE_EMAIL || "parade@chicagostpatricksdayparade.org";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Items purchasable through this endpoint, with per-item rules. */
const PURCHASABLE: Record<string, { successPath: string; maxQty: number }> = {
  "parade-entry": { successPath: "/register", maxQty: 1 },
  "ad-full-color": { successPath: "/ad-book", maxQty: 5 },
  "ad-full-bw": { successPath: "/ad-book", maxQty: 5 },
  "ad-half-bw": { successPath: "/ad-book", maxQty: 5 },
  "cbc-seat": { successPath: "/cbc-dinner", maxQty: 9 },
  "cbc-table": { successPath: "/cbc-dinner", maxQty: 10 },
  grandstand: { successPath: "/grandstand-seats", maxQty: 50 },
  "light-pole-banner": { successPath: "/light-pole-banner", maxQty: 10 },
  raffle: { successPath: "/raffle", maxQty: 10 },
  "lapel-pin": { successPath: "/register", maxQty: 50 },
  donation: { successPath: "/register", maxQty: 100000 },
};

export async function POST(req: NextRequest) {
  if (!isPurchaseOpen()) {
    return NextResponse.json(
      { ok: false, error: "Purchases are currently closed for the season." },
      { status: 403 }
    );
  }

  let body: {
    itemId?: string;
    quantity?: number;
    fullName?: string;
    email?: string;
    phone?: string;
    note?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const itemId = body.itemId || "";
  const rules = PURCHASABLE[itemId];
  const item = ALA_CARTE_ITEMS.find((i) => i.id === itemId);
  const fullName = (body.fullName || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const quantity = Math.floor(Number(body.quantity) || 0);

  const errors: string[] = [];
  if (!item || !rules) errors.push("Unknown item.");
  if (item?.isPast) errors.push("This item is no longer available this season.");
  if (!fullName) errors.push("Full name is required.");
  if (!email || !isValidEmail(email)) errors.push("A valid email is required.");
  if (!phone) errors.push("Phone number is required.");
  if (rules && (quantity < 1 || quantity > rules.maxQty)) {
    errors.push(`Quantity must be between 1 and ${rules.maxQty}.`);
  }
  if (itemId === "light-pole-banner" && !(body.note || "").trim()) {
    errors.push("Enter the company or family name to display on the banner.");
  }
  if (errors.length > 0 || !item || !rules) {
    return NextResponse.json({ ok: false, error: errors.join(" ") }, { status: 400 });
  }

  // Total always computed server-side from canonical pricing
  const total = item.price * quantity;
  const totalLabel = `$${total.toLocaleString("en-US")}.00`;

  try {
    const table = itemId === "raffle" ? TABLES.raffle : TABLES.orders;
    const record = await createRecord(table, {
      Item: item.name,
      "Item ID": itemId,
      Quantity: quantity,
      "Unit Price": item.price,
      Total: total,
      Name: fullName,
      Email: email,
      Phone: phone,
      Note: (body.note || "").trim(),
      Status: "Pending Payment",
      Year: PARADE_INFO.year,
      "Submitted At": new Date().toISOString(),
    });

    // Try Stripe checkout; fall back to pending-invoice mode when not configured
    let checkoutUrl: string | null = null;
    if (isStripeConfigured()) {
      const session = await createCheckoutSession({
        lineItems: [
          {
            name: item.name,
            description: item.description,
            unitAmount: item.price * 100,
            quantity,
          },
        ],
        customerEmail: email,
        reference: record.id,
        successPath: rules.successPath,
        cancelPath: rules.successPath,
        metadata: { table, recordId: record.id, itemId, itemName: item.name },
      });
      checkoutUrl = session?.url ?? null;
    }

    const selections = detailsTable([
      ["Item", item.name],
      ["Quantity", quantity],
      ["Total", totalLabel],
    ]);

    void sendTemplatedEmail({
      to: email,
      templateKey: itemId === "raffle" ? "raffle_confirmation" : "order_confirmation",
      vars: {
        contactName: fullName.split(" ")[0] || fullName,
        itemName: item.name,
        quantity,
        year: PARADE_INFO.year,
        reference: record.id,
        totalLabel,
        selectionsHtml: selections,
        paymentNote: checkoutUrl
          ? "Complete your payment via the secure checkout link to confirm your order."
          : "A member of the parade committee will follow up shortly to arrange payment.",
      },
    });
    void sendTemplatedEmail({
      to: COMMITTEE_EMAIL,
      templateKey: "committee_notification",
      vars: {
        kind: itemId === "raffle" ? "raffle ticket order" : "order",
        summary: `${item.name} ×${quantity} — ${fullName}`,
        reference: record.id,
        selectionsHtml: detailsTable([
          ["Item", item.name],
          ["Quantity", quantity],
          ["Total", totalLabel],
          ["Name", fullName],
          ["Email", email],
          ["Phone", phone],
          ["Payment", checkoutUrl ? "Stripe checkout started" : "Pending — follow up required"],
        ]),
      },
    });

    return NextResponse.json({
      ok: true,
      reference: record.id,
      total,
      totalLabel,
      checkoutUrl,
      mode: checkoutUrl ? "stripe" : "invoice",
    });
  } catch (err) {
    console.error("[api/purchase] failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong processing your order. Please try again or contact us." },
      { status: 500 }
    );
  }
}
