import { NextRequest, NextResponse } from "next/server";
import { isAirtableConfigured, listRecords, updateRecord, TABLES } from "@/lib/airtable";
import { sendTemplatedEmail } from "@/lib/email";
import { PARADE_INFO } from "@/lib/data";

/**
 * Scheduled reminders — designed to run hourly via Vercel Cron.
 *
 * 1. Logo/artwork reminders: paid/registered orgs with an ad but no artwork
 *    on file get a nudge (at most once every REMINDER_COOLDOWN_DAYS).
 * 2. Deadline reminders are driven off PARADE_INFO deadlines (moves to the
 *    Airtable "Parade Years" table in the CMS phase).
 *
 * Idempotency: every send stamps "Last Reminder At" on the record; a record
 * is never reminded twice inside the cooldown window.
 */

const REMINDER_COOLDOWN_DAYS = 7;
const CRON_SECRET = process.env.CRON_SECRET;

type ReminderableRecord = {
  "Organization Name"?: string;
  "Contact Name"?: string;
  Email?: string;
  "Ad Size"?: string;
  "Artwork URL"?: string;
  "Last Reminder At"?: string;
  Status?: string;
};

function daysSince(iso?: string): number {
  if (!iso) return Infinity;
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return Infinity;
  return (Date.now() - then) / (1000 * 60 * 60 * 24);
}

export async function GET(req: NextRequest) {
  // Vercel Cron sends Authorization: Bearer ${CRON_SECRET} when configured
  const auth = req.headers.get("authorization");
  if (CRON_SECRET && auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!isAirtableConfigured()) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: "Airtable not configured — nothing to check",
    });
  }

  const results = { checked: 0, remindersSent: 0, errors: 0 };

  try {
    // Registrations that selected an ad but haven't submitted artwork
    const registrations = await listRecords<ReminderableRecord>(TABLES.registrations, {
      filterByFormula: `AND({Ad Size} != "", {Ad Size} != "No additional ad", {Artwork URL} = "")`,
      revalidate: 0,
    });

    const adDeadline = new Date(PARADE_INFO.deadlines.adBookDeadline);
    const deadlinePassed = Date.now() > adDeadline.getTime();

    for (const record of registrations) {
      results.checked += 1;
      const fields = record.fields;
      if (deadlinePassed) continue;
      if (!fields.Email) continue;
      if (daysSince(fields["Last Reminder At"]) < REMINDER_COOLDOWN_DAYS) continue;

      const sent = await sendTemplatedEmail({
        to: fields.Email,
        templateKey: "logo_reminder",
        vars: {
          contactName: (fields["Contact Name"] || "").split(" ")[0] || "there",
          orgName: fields["Organization Name"] || "your organization",
          year: PARADE_INFO.year,
          deadline: adDeadline.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        },
      });

      if (sent.ok) {
        results.remindersSent += 1;
        await updateRecord(TABLES.registrations, record.id, {
          "Last Reminder At": new Date().toISOString(),
        });
      } else {
        results.errors += 1;
      }
    }
  } catch (err) {
    console.error("[api/cron/reminders] failed:", err);
    return NextResponse.json({ ok: false, error: String(err), results }, { status: 500 });
  }

  return NextResponse.json({ ok: true, ...results, at: new Date().toISOString() });
}
