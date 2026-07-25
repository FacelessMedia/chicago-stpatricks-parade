/**
 * Email engine — branded, template-driven, committee-editable.
 *
 * Templates are looked up in Airtable ("Email Templates" table) first so the
 * committee can edit subject/body mid-season without a deploy. When a key is
 * not found (or Airtable isn't configured), the built-in defaults below are
 * used, so every email always sends.
 *
 * Delivery is via the Resend REST API (no SDK dependency). When
 * RESEND_API_KEY is not configured, emails are logged to the console so
 * development flows still complete end-to-end.
 */

import { fetchEmailTemplate, createRecord, TABLES } from "./airtable";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
/**
 * Gmail strategy: the committee's parade@chicagostpatricksdayparade.org is a
 * Gmail account we can't send from directly. Instead we send from a
 * Resend-verified subdomain (EMAIL_FROM, e.g. parade@mail.chicagostpatricksdayparade.org)
 * and set Reply-To to the Gmail — so every reply lands in their inbox.
 */
const EMAIL_FROM =
  process.env.EMAIL_FROM || "Chicago St. Patrick's Day Parade <parade@mail.chicagostpatricksdayparade.org>";
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || "parade@chicagostpatricksdayparade.org";
const EMAIL_BCC = process.env.EMAIL_BCC; // optional committee copy

export function isEmailConfigured(): boolean {
  return Boolean(RESEND_API_KEY);
}

/* ============================================================
 * Built-in default templates ({{merge_fields}} substituted at send time).
 * Committee overrides live in Airtable under the same keys.
 * ============================================================ */
export const DEFAULT_TEMPLATES: Record<string, { subject: string; body: string }> = {
  registration_confirmation: {
    subject: "We received your {{year}} parade registration — {{orgName}}",
    body: `<p>Dear {{contactName}},</p>
<p>Thank you for registering for the {{year}} Chicago St. Patrick's Day Parade! We've received your registration for <strong>{{orgName}}</strong>.</p>
<p><strong>Your selections:</strong></p>
{{selectionsHtml}}
<p><strong>Reference:</strong> {{reference}}</p>
<p>A member of the parade committee will follow up to confirm details{{paymentNote}}.</p>
<p>Go raibh maith agat — thank you for being part of the tradition!</p>`,
  },
  payment_receipt: {
    subject: "Receipt — {{itemName}} ({{year}} Chicago St. Patrick's Day Parade)",
    body: `<p>Dear {{contactName}},</p>
<p>We've received your payment. Here's your receipt:</p>
{{selectionsHtml}}
<p><strong>Total paid:</strong> {{totalLabel}}<br/><strong>Reference:</strong> {{reference}}</p>
<p>See you on Parade Day!</p>`,
  },
  order_confirmation: {
    subject: "Order received — {{itemName}} ({{year}} parade)",
    body: `<p>Dear {{contactName}},</p>
<p>We've received your order for <strong>{{itemName}}</strong>.</p>
{{selectionsHtml}}
<p><strong>Total:</strong> {{totalLabel}}<br/><strong>Reference:</strong> {{reference}}</p>
<p>{{paymentNote}}</p>`,
  },
  raffle_confirmation: {
    subject: "Your raffle ticket order — {{year}} Chicago St. Patrick's Day Parade",
    body: `<p>Dear {{contactName}},</p>
<p>Thank you for supporting the parade! We've received your order for <strong>{{quantity}} raffle ticket(s)</strong>.</p>
<p><strong>Total:</strong> {{totalLabel}}<br/><strong>Reference:</strong> {{reference}}</p>
<p>Your official ticket numbers will be emailed to you once your payment is confirmed. Remember — only 750 tickets are sold each year. Good luck!</p>`,
  },
  contact_acknowledgement: {
    subject: "We got your message — Chicago St. Patrick's Day Parade",
    body: `<p>Dear {{contactName}},</p>
<p>Thanks for reaching out about <strong>{{subject}}</strong>. A member of the parade committee will get back to you shortly.</p>
<p>Sláinte!</p>`,
  },
  committee_notification: {
    subject: "[Website] New {{kind}}: {{summary}}",
    body: `<p>A new <strong>{{kind}}</strong> just came in through the website:</p>
{{selectionsHtml}}
<p><strong>Reference:</strong> {{reference}}</p>`,
  },
  logo_reminder: {
    subject: "Reminder: we still need your ad artwork — {{year}} Parade Ad Book",
    body: `<p>Dear {{contactName}},</p>
<p>Friendly reminder that we haven't yet received the ad artwork for <strong>{{orgName}}</strong>.</p>
<p>The ad book deadline is <strong>{{deadline}}</strong>. Please reply to this email with your high-resolution artwork (PDF, PNG, or JPG).</p>
<p>Thank you!</p>`,
  },
  deadline_reminder: {
    subject: "Deadline approaching: {{deadlineName}} — {{deadline}}",
    body: `<p>Dear {{contactName}},</p>
<p>A quick reminder that the <strong>{{deadlineName}}</strong> deadline is <strong>{{deadline}}</strong>.</p>
<p>If you've already taken care of this, you can disregard this note. Otherwise, don't miss out!</p>`,
  },
};

/** Substitute {{merge_fields}} in a template string. */
export function renderTemplate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : ""
  );
}

/** Branded HTML wrapper matching the website. */
function brandedLayout(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:#faf7f0;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf7f0;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:linear-gradient(135deg,#022c22,#065f46);border-radius:16px 16px 0 0;padding:32px;text-align:center;">
            <p style="color:#d4a843;font-size:13px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">Chicago</p>
            <h1 style="color:#ffffff;font-size:26px;margin:0;">St. Patrick's Day Parade</h1>
          </td>
        </tr>
        <tr>
          <td style="background-color:#ffffff;padding:32px;color:#1a1a2e;font-size:16px;line-height:1.6;">
            ${bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="background-color:#022c22;border-radius:0 0 16px 16px;padding:24px 32px;text-align:center;">
            <p style="color:#a7f3d0;font-size:12px;margin:0;">
              Chicago St. Patrick's Day Parade Committee<br/>
              <a href="https://chicagostpatricksdayparade.org" style="color:#d4a843;">chicagostpatricksdayparade.org</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export type SendEmailInput = {
  to: string;
  templateKey: keyof typeof DEFAULT_TEMPLATES | (string & {});
  vars: Record<string, string | number>;
  /** Optional plain subject/body override (skips template lookup). */
  overrideSubject?: string;
};

export type SendEmailResult = { ok: boolean; id?: string; skipped?: boolean; error?: string };

/**
 * Send a templated email. Template resolution order:
 * 1. Airtable "Email Templates" table (committee-editable, mid-stream)
 * 2. Built-in DEFAULT_TEMPLATES
 */
export async function sendTemplatedEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const airtableTemplate = await fetchEmailTemplate(input.templateKey);
  const fallback = DEFAULT_TEMPLATES[input.templateKey];
  const subjectTemplate = input.overrideSubject ?? airtableTemplate?.Subject ?? fallback?.subject;
  const bodyTemplate = airtableTemplate?.Body ?? fallback?.body;

  if (!subjectTemplate || !bodyTemplate) {
    const error = `No template found for key "${input.templateKey}"`;
    console.error(`[email] ${error}`);
    return { ok: false, error };
  }

  const subject = renderTemplate(subjectTemplate, input.vars);
  const html = brandedLayout(renderTemplate(bodyTemplate, input.vars));

  let result: SendEmailResult;
  if (!isEmailConfigured()) {
    console.log(
      `[email:offline] would send "${subject}" to ${input.to} (template: ${input.templateKey})`
    );
    result = { ok: true, skipped: true };
  } else {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: EMAIL_FROM,
          to: [input.to],
          reply_to: [EMAIL_REPLY_TO],
          ...(EMAIL_BCC ? { bcc: [EMAIL_BCC] } : {}),
          subject,
          html,
        }),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`Resend responded ${res.status}: ${body}`);
      }
      const data = (await res.json()) as { id?: string };
      result = { ok: true, id: data.id };
    } catch (err) {
      const error = err instanceof Error ? err.message : String(err);
      console.error(`[email] send failed for ${input.to}:`, error);
      result = { ok: false, error };
    }
  }

  // Best-effort send log (visible to the committee in Airtable)
  createRecord(TABLES.emailLog, {
    To: input.to,
    Subject: subject,
    Template: input.templateKey,
    Status: result.ok ? (result.skipped ? "skipped (email not configured)" : "sent") : "failed",
    Error: result.error || "",
    "Sent At": new Date().toISOString(),
  }).catch((err) => console.error("[email] failed to write email log:", err));

  return result;
}

/** Render a simple key/value table for order summaries in emails. */
export function detailsTable(rows: Array<[string, string | number]>): string {
  const tr = rows
    .filter(([, v]) => v !== "" && v !== undefined && v !== null)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;border:1px solid #d1fae5;background:#ecfdf5;font-weight:bold;white-space:nowrap;">${k}</td><td style="padding:6px 12px;border:1px solid #d1fae5;">${v}</td></tr>`
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:16px 0;width:100%;font-size:14px;">${tr}</table>`;
}
