/**
 * Stripe checkout helper — dependency-free (uses the Stripe REST API).
 *
 * When STRIPE_SECRET_KEY is not configured, checkout creation returns null
 * and calling flows fall back to "pending invoice" mode: the order is still
 * recorded in Airtable and the committee follows up for payment — so the
 * site is fully functional before Stripe keys are provided.
 */

/**
 * SAFETY GUARD: live-mode keys (sk_live_/rk_live_) are REFUSED unless
 * STRIPE_ALLOW_LIVE=true is explicitly set. Until then, only test/sandbox
 * keys (sk_test_) will ever be used — real money cannot move, period.
 */
const RAW_KEY = process.env.STRIPE_SECRET_KEY;
const ALLOW_LIVE = process.env.STRIPE_ALLOW_LIVE === "true";
const isLiveKey = Boolean(RAW_KEY && (RAW_KEY.startsWith("sk_live_") || RAW_KEY.startsWith("rk_live_")));

if (isLiveKey && !ALLOW_LIVE) {
  console.error(
    "[stripe] BLOCKED: a LIVE Stripe key is set but STRIPE_ALLOW_LIVE is not 'true'. " +
      "Falling back to invoice mode. Use a sk_test_ key for the sandbox."
  );
}

const STRIPE_SECRET_KEY = isLiveKey && !ALLOW_LIVE ? undefined : RAW_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function isStripeConfigured(): boolean {
  return Boolean(STRIPE_SECRET_KEY);
}

/** True when running on a test/sandbox key — shown in committee notifications. */
export function isStripeTestMode(): boolean {
  return Boolean(STRIPE_SECRET_KEY && STRIPE_SECRET_KEY.startsWith("sk_test_"));
}

export type CheckoutLineItem = {
  name: string;
  description?: string;
  /** Amount in cents. Always computed server-side. */
  unitAmount: number;
  quantity: number;
};

export type CheckoutSession = { id: string; url: string };

/**
 * Create a Stripe Checkout session. Returns null when Stripe is not
 * configured so callers can fall back gracefully.
 */
export async function createCheckoutSession(opts: {
  lineItems: CheckoutLineItem[];
  customerEmail: string;
  reference: string;
  successPath?: string;
  cancelPath?: string;
  metadata?: Record<string, string>;
}): Promise<CheckoutSession | null> {
  if (!isStripeConfigured()) return null;

  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("customer_email", opts.customerEmail);
  params.set("client_reference_id", opts.reference);
  params.set(
    "success_url",
    `${SITE_URL}${opts.successPath || "/register"}?status=paid&ref=${encodeURIComponent(opts.reference)}`
  );
  params.set(
    "cancel_url",
    `${SITE_URL}${opts.cancelPath || "/register"}?status=cancelled&ref=${encodeURIComponent(opts.reference)}`
  );
  opts.lineItems.forEach((item, i) => {
    params.set(`line_items[${i}][quantity]`, String(item.quantity));
    params.set(`line_items[${i}][price_data][currency]`, "usd");
    params.set(`line_items[${i}][price_data][unit_amount]`, String(item.unitAmount));
    params.set(`line_items[${i}][price_data][product_data][name]`, item.name);
    if (item.description) {
      params.set(`line_items[${i}][price_data][product_data][description]`, item.description);
    }
  });
  Object.entries(opts.metadata || {}).forEach(([k, v]) => {
    params.set(`metadata[${k}]`, v);
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Stripe checkout session creation failed (${res.status}): ${body}`);
  }

  const session = (await res.json()) as { id: string; url: string };
  return { id: session.id, url: session.url };
}
