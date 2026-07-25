import { NextRequest, NextResponse } from "next/server";
import { createRecord, TABLES } from "@/lib/airtable";
import { sendTemplatedEmail, detailsTable } from "@/lib/email";

const COMMITTEE_EMAIL = process.env.COMMITTEE_EMAIL || "parade@chicagostpatricksdayparade.org";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const firstName = (body.firstName || "").trim();
  const lastName = (body.lastName || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const subject = (body.subject || "General Inquiry").trim();
  const message = (body.message || "").trim();

  const errors: string[] = [];
  if (!firstName) errors.push("First name is required.");
  if (!email || !isValidEmail(email)) errors.push("A valid email is required.");
  if (!message) errors.push("Message is required.");
  if (message.length > 5000) errors.push("Message is too long.");
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, error: errors.join(" ") }, { status: 400 });
  }

  const contactName = `${firstName} ${lastName}`.trim();

  try {
    const record = await createRecord(TABLES.contacts, {
      Name: contactName,
      Email: email,
      Phone: phone,
      Subject: subject,
      Message: message,
      Status: "New",
      "Submitted At": new Date().toISOString(),
    });

    // Fire-and-forget emails; failures are logged, never block the response
    void sendTemplatedEmail({
      to: email,
      templateKey: "contact_acknowledgement",
      vars: { contactName: firstName, subject },
    });
    void sendTemplatedEmail({
      to: COMMITTEE_EMAIL,
      templateKey: "committee_notification",
      vars: {
        kind: "contact message",
        summary: subject,
        reference: record.id,
        selectionsHtml: detailsTable([
          ["From", contactName],
          ["Email", email],
          ["Phone", phone],
          ["Subject", subject],
          ["Message", message],
        ]),
      },
    });

    return NextResponse.json({ ok: true, reference: record.id });
  } catch (err) {
    console.error("[api/contact] failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong saving your message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
