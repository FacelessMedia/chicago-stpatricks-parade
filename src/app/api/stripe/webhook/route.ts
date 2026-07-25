import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { updateRecord } from "@/lib/airtable";
import { sendTemplatedEmail, detailsTable } from "@/lib/email";
import { PARADE_INFO } from "@/lib/data";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Verify a Stripe webhook signature (v1 scheme) without the Stripe SDK.
 * https://docs.stripe.com/webhooks/signature
 */
function verifyStripeSignature(payload: string, sigHeader: string, secret: string): boolean {
  const parts = Object.fromEntries(
    sigHeader.split(",").map((kv) => kv.split("=") as [string, string])
  );
  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return false;

  // Reject events older than 5 minutes (replay protection)
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"));
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, error: "Webhook not configured" }, { status: 501 });
  }

  const payload = await req.text();
  const sigHeader = req.headers.get("stripe-signature") || "";
  if (!verifyStripeSignature(payload, sigHeader, WEBHOOK_SECRET)) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 400 });
  }

  let event: {
    type: string;
    data: {
      object: {
        id: string;
        client_reference_id?: string;
        customer_email?: string;
        customer_details?: { email?: string; name?: string };
        amount_total?: number;
        metadata?: Record<string, string>;
        payment_intent?: string;
      };
    };
  };
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const table = session.metadata?.table;
    const recordId = session.metadata?.recordId || session.client_reference_id;
    const email = session.customer_details?.email || session.customer_email;
    const name = session.customer_details?.name || "";
    const amount = (session.amount_total ?? 0) / 100;
    const totalLabel = `$${amount.toLocaleString("en-US")}.00`;

    if (table && recordId) {
      try {
        await updateRecord(table, recordId, {
          Status: "Paid",
          "Stripe Session ID": session.id,
          "Stripe Payment Intent": session.payment_intent || "",
          "Paid At": new Date().toISOString(),
          "Amount Paid": amount,
        });
        const relatedTable = session.metadata?.relatedTable;
        const relatedRecordId = session.metadata?.relatedRecordId;
        if (relatedTable && relatedRecordId) {
          const relatedAmount = Number(session.metadata?.relatedAmount);
          await updateRecord(relatedTable, relatedRecordId, {
            Status: "Paid",
            "Stripe Session ID": session.id,
            "Stripe Payment Intent": session.payment_intent || "",
            "Paid At": new Date().toISOString(),
            "Amount Paid": Number.isFinite(relatedAmount) ? relatedAmount : amount,
          });
        }
      } catch (err) {
        console.error("[api/stripe/webhook] failed to update record:", err);
        // Return 500 so Stripe retries the webhook
        return NextResponse.json({ ok: false, error: "Record update failed" }, { status: 500 });
      }
    }

    if (email) {
      void sendTemplatedEmail({
        to: email,
        templateKey: "payment_receipt",
        vars: {
          contactName: name.split(" ")[0] || "there",
          itemName: session.metadata?.itemName || session.metadata?.itemId || "your order",
          year: PARADE_INFO.year,
          reference: recordId || session.id,
          totalLabel,
          selectionsHtml: detailsTable([
            ["Payment", totalLabel],
            ["Reference", recordId || session.id],
          ]),
        },
      });
    }
  }

  return NextResponse.json({ ok: true, received: true });
}
