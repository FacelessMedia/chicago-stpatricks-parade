"use client";

import { useState } from "react";
import { Minus, Plus, Check, Ticket } from "lucide-react";

interface PurchaseCardProps {
  itemId: string;
  title: string;
  pricePerUnit: number;
  unitLabel: string;
  maxQuantity?: number;
  initialQuantity?: number;
  footnote?: string;
  icon?: boolean;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream";

export function PurchaseCard({
  itemId,
  title,
  pricePerUnit,
  unitLabel,
  maxQuantity = 50,
  initialQuantity = 1,
  footnote,
  icon,
}: PurchaseCardProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ reference: string; mode: string } | null>(null);

  const total = quantity * pricePerUnit;

  const handlePurchase = async () => {
    setError("");
    if (!fullName.trim()) return setError("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return setError("Please enter a valid email address.");
    if (!phone.trim()) return setError("Please enter a phone number.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity, fullName, email, phone }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setResult({ reference: data.reference, mode: data.mode });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-xl h-fit text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-charcoal font-heading mb-3">Order Received!</h3>
        <p className="text-charcoal/70 mb-2">
          Thanks, {fullName.split(" ")[0]}! We&apos;ve received your order for{" "}
          <span className="font-semibold">
            {quantity} {unitLabel}
            {quantity > 1 ? "s" : ""}
          </span>{" "}
          (${total.toLocaleString("en-US")}.00).
        </p>
        <p className="text-charcoal/60 text-sm mb-4">
          A confirmation email is on its way to {email}. A member of the committee will follow up
          to arrange payment.
        </p>
        <p className="text-charcoal/40 text-xs font-mono">Ref: {result.reference}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-xl h-fit sticky top-28">
      <div className="flex items-center gap-3 mb-2">
        {icon && <Ticket className="w-6 h-6 text-gold-500" />}
        <h3 className="text-2xl font-bold text-charcoal font-heading">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-emerald-800 mb-6">
        ${pricePerUnit}{" "}
        <span className="text-base font-normal text-charcoal/60">per {unitLabel}</span>
      </p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Number of {unitLabel.charAt(0).toUpperCase() + unitLabel.slice(1)}s
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full border-2 border-emerald-200 flex items-center justify-center hover:border-emerald-500 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4 text-charcoal" />
            </button>
            <span className="text-2xl font-bold text-charcoal w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
              className="w-10 h-10 rounded-full border-2 border-emerald-200 flex items-center justify-center hover:border-emerald-500 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 text-charcoal" />
            </button>
          </div>
        </div>

        <div>
          <label htmlFor={`${itemId}-name`} className="block text-sm font-medium text-charcoal mb-1.5">Full Name *</label>
          <input
            id={`${itemId}-name`}
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputClass}
            placeholder="John O'Brien"
          />
        </div>
        <div>
          <label htmlFor={`${itemId}-email`} className="block text-sm font-medium text-charcoal mb-1.5">Email *</label>
          <input
            id={`${itemId}-email`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label htmlFor={`${itemId}-phone`} className="block text-sm font-medium text-charcoal mb-1.5">Phone *</label>
          <input
            id={`${itemId}-phone`}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="(312) 555-0000"
          />
        </div>

        <div className="border-t border-emerald-100 pt-5">
          <div className="flex justify-between text-sm text-charcoal/60 mb-2">
            <span>
              {quantity} × ${pricePerUnit}
            </span>
            <span>${total.toLocaleString("en-US")}.00</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-charcoal">
            <span>Total</span>
            <span className="text-emerald-800">${total.toLocaleString("en-US")}.00</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        <button
          onClick={handlePurchase}
          disabled={submitting}
          className="w-full px-8 py-4 bg-gold-500 hover:bg-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-emerald-950 font-bold rounded-full transition-all text-lg"
        >
          {submitting ? "Processing..." : `Purchase ${title}`}
        </button>

        {footnote && <p className="text-charcoal/40 text-xs text-center">{footnote}</p>}
      </div>
    </div>
  );
}
