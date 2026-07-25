"use client";

import { useState } from "react";
import { Clover, Check } from "lucide-react";

const SUBJECTS = [
  "General Inquiry",
  "Sponsorship Packages",
  "Parade Entry",
  "Grandstand Seats",
  "CBC Dinner",
  "Queen Contest",
  "Raffle Tickets",
  "Ad Book",
  "Media / Press",
  "Other",
];

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream";

export function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: SUBJECTS[0],
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.firstName.trim()) return setError("Please enter your first name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return setError("Please enter a valid email address.");
    if (!form.message.trim()) return setError("Please enter a message.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-12 border border-emerald-100 shadow-lg text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-charcoal font-heading mb-3">Message Sent!</h2>
        <p className="text-charcoal/60">
          Thanks, {form.firstName}. We&apos;ve received your message about{" "}
          <span className="font-semibold">{form.subject}</span> and will get back to you shortly.
          A confirmation was sent to {form.email}.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Clover className="w-5 h-5 text-emerald-600" />
        <h2 className="text-2xl font-bold text-charcoal font-heading">Send Us a Message</h2>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-charcoal mb-1.5">First Name *</label>
            <input
              id="firstName"
              type="text"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className={inputClass}
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-charcoal mb-1.5">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className={inputClass}
              placeholder="O'Brien"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1.5">Email *</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-1.5">Phone</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
            placeholder="(312) 555-0000"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-1.5">Subject</label>
          <select
            id="subject"
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
            className={inputClass}
          >
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1.5">Message *</label>
          <textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="How can we help you?"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-8 py-4 bg-emerald-800 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-full transition-all text-lg"
        >
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
