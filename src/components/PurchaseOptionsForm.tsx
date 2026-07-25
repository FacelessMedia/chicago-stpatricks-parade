"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, Minus, Plus, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

interface PurchaseOption {
  itemId: string;
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  unitLabel: string;
  maxQuantity: number;
  initialQuantity?: number;
}

interface PurchaseOptionsFormProps {
  title: string;
  description: string;
  options: PurchaseOption[];
  noteLabel?: string;
  notePlaceholder?: string;
  noteRequired?: boolean;
  footnote?: string;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream";

export function PurchaseOptionsForm({
  title,
  description,
  options,
  noteLabel,
  notePlaceholder,
  noteRequired = false,
  footnote,
}: PurchaseOptionsFormProps) {
  const [selectedItemId, setSelectedItemId] = useState(options[0]?.itemId || "");
  const [quantity, setQuantity] = useState(options[0]?.initialQuantity || 1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ reference: string; mode: string } | null>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.itemId === selectedItemId),
    [options, selectedItemId]
  );
  const total = selectedOption ? selectedOption.price * quantity : 0;

  const selectOption = (option: PurchaseOption) => {
    setSelectedItemId(option.itemId);
    setQuantity(option.initialQuantity || 1);
    setError("");
  };

  const handlePurchase = async () => {
    setError("");
    if (!selectedOption) return setError("Please choose an option.");
    if (!fullName.trim()) return setError("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return setError("Please enter a valid email address.");
    }
    if (!phone.trim()) return setError("Please enter a phone number.");
    if (noteRequired && !note.trim()) return setError(`Please enter ${noteLabel?.toLowerCase() || "the required details"}.`);

    setSubmitting(true);
    try {
      const response = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: selectedOption.itemId,
          quantity,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          note: note.trim(),
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
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

  if (options.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-xl">
        <h3 className="text-xl font-bold text-charcoal">No options available</h3>
        <p className="mt-2 text-charcoal/60">Please check back soon or contact the parade committee.</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold font-heading text-charcoal">Order Received</h3>
        <p className="mt-3 text-charcoal/70">
          Your order has been saved. A confirmation has been sent to <span className="font-semibold">{email}</span>.
        </p>
        <p className="mt-4 font-mono text-xs text-charcoal/50">Reference: {result.reference}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-xl sm:p-8">
      <div className="mb-7 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-100">
          <Ticket className="h-6 w-6 text-gold-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-heading text-charcoal">{title}</h2>
          <p className="mt-1 text-sm text-charcoal/60">{description}</p>
        </div>
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            type="button"
            key={option.itemId}
            onClick={() => selectOption(option)}
            className={cn(
              "w-full rounded-xl border-2 p-4 text-left transition-all",
              selectedItemId === option.itemId
                ? "border-emerald-600 bg-emerald-50"
                : "border-emerald-100 hover:border-emerald-300"
            )}
          >
            <span className="flex items-start justify-between gap-4">
              <span>
                <span className="block font-bold text-charcoal">{option.name}</span>
                <span className="mt-1 block text-sm text-charcoal/60">{option.description}</span>
              </span>
              <span className="shrink-0 font-bold text-emerald-700">{option.priceLabel}</span>
            </span>
          </button>
        ))}
      </div>

      {selectedOption && (
        <div className="mt-7 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-charcoal">
              Number of {selectedOption.unitLabel.charAt(0).toUpperCase() + selectedOption.unitLabel.slice(1)}s
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-200 disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-xl font-bold text-charcoal">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(selectedOption.maxQuantity, quantity + 1))}
                disabled={quantity >= selectedOption.maxQuantity}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-white disabled:opacity-40"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${selectedOption.itemId}-name`} className="mb-1.5 block text-sm font-medium text-charcoal">Full Name *</label>
              <input id={`${selectedOption.itemId}-name`} value={fullName} onChange={(event) => setFullName(event.target.value)} className={inputClass} autoComplete="name" />
            </div>
            <div>
              <label htmlFor={`${selectedOption.itemId}-phone`} className="mb-1.5 block text-sm font-medium text-charcoal">Phone *</label>
              <input id={`${selectedOption.itemId}-phone`} type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className={inputClass} autoComplete="tel" />
            </div>
          </div>

          <div>
            <label htmlFor={`${selectedOption.itemId}-email`} className="mb-1.5 block text-sm font-medium text-charcoal">Email *</label>
            <input id={`${selectedOption.itemId}-email`} type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} autoComplete="email" />
          </div>

          {noteLabel && (
            <div>
              <label htmlFor={`${selectedOption.itemId}-note`} className="mb-1.5 block text-sm font-medium text-charcoal">
                {noteLabel}{noteRequired ? " *" : ""}
              </label>
              <textarea
                id={`${selectedOption.itemId}-note`}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                className={`${inputClass} resize-none`}
                rows={3}
                placeholder={notePlaceholder}
              />
            </div>
          )}

          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="flex items-center justify-between text-sm text-charcoal/60">
              <span>{quantity} × ${selectedOption.price.toLocaleString("en-US")}</span>
              <span>${total.toLocaleString("en-US")}.00</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-lg font-bold text-charcoal">
              <span>Total</span>
              <span className="text-emerald-800">${total.toLocaleString("en-US")}.00</span>
            </div>
          </div>

          {error && (
            <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handlePurchase}
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-lg font-bold text-emerald-950 transition-all hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Preparing Checkout..." : "Continue to Secure Payment"}
            {!submitting && <ArrowRight className="h-5 w-5" />}
          </button>

          {footnote && <p className="text-center text-xs text-charcoal/50">{footnote}</p>}
        </div>
      )}
    </div>
  );
}
