"use client";

import { useState } from "react";
import Link from "next/link";
import { Ticket, Gift, ArrowRight, Minus, Plus, AlertTriangle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export default function RafflePage() {
  const [quantity, setQuantity] = useState(1);
  const pricePerTicket = 100;
  const totalAvailable = 750;
  const estimatedSold = 310;

  return (
    <>
      <section className="relative py-32 px-4 hero-gradient text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Gift className="w-16 h-16 text-gold-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-4 text-shadow">
            Raffle Tickets
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto">
            Only {totalAvailable} tickets available — win incredible prizes while supporting the parade
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading title="Annual Raffle" centered={false} />
              <div className="space-y-6 text-charcoal/70">
                <p>
                  The Chicago St. Patrick&apos;s Day Parade Annual Raffle is one of the most anticipated
                  traditions of the parade season. With only {totalAvailable} tickets available each year at
                  ${pricePerTicket} per ticket, these limited tickets give you a chance to win amazing prizes
                  while directly supporting the parade.
                </p>
                <p>
                  Raffle tickets are sold by parade officers and committee members, as well as online.
                  Each ticket is individually numbered and tracked. The drawing takes place during parade
                  season — you don&apos;t need to be present to win!
                </p>

                <div className="bg-gold-50 rounded-xl p-5 border border-gold-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-gold-600" />
                    <h3 className="font-bold text-gold-800">Limited Availability</h3>
                  </div>
                  <p className="text-gold-700 text-sm">
                    Only {totalAvailable} tickets are sold each year. Approximately {estimatedSold} have already been sold.
                    Don&apos;t miss your chance!
                  </p>
                  <div className="mt-3 bg-gold-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gold-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${(estimatedSold / totalAvailable) * 100}%` }}
                    />
                  </div>
                  <p className="text-gold-600 text-xs mt-2 font-medium">
                    ~{totalAvailable - estimatedSold} tickets remaining
                  </p>
                </div>
              </div>
            </div>

            {/* Purchase Card */}
            <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-xl h-fit sticky top-28">
              <div className="flex items-center gap-3 mb-2">
                <Ticket className="w-6 h-6 text-gold-500" />
                <h3 className="text-2xl font-bold text-charcoal font-heading">Purchase Raffle Tickets</h3>
              </div>
              <p className="text-3xl font-bold text-emerald-800 mb-6">
                ${pricePerTicket} <span className="text-base font-normal text-charcoal/60">per ticket</span>
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Number of Tickets</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full border-2 border-emerald-200 flex items-center justify-center hover:border-emerald-500 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-charcoal" />
                    </button>
                    <span className="text-2xl font-bold text-charcoal w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-10 h-10 rounded-full border-2 border-emerald-200 flex items-center justify-center hover:border-emerald-500 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-charcoal" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">Full Name *</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream" placeholder="John O'Brien" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">Email *</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">Phone *</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream" placeholder="(312) 555-0000" />
                </div>

                <div className="border-t border-emerald-100 pt-5">
                  <div className="flex justify-between text-sm text-charcoal/60 mb-2">
                    <span>{quantity} × ${pricePerTicket}</span>
                    <span>${quantity * pricePerTicket}.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-charcoal">
                    <span>Total</span>
                    <span className="text-emerald-800">${quantity * pricePerTicket}.00</span>
                  </div>
                </div>

                <button className="w-full px-8 py-4 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold rounded-full transition-all text-lg">
                  Purchase Raffle Tickets
                </button>

                <p className="text-charcoal/40 text-xs text-center">
                  Secure checkout powered by Stripe. Ticket numbers will be emailed to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold font-heading text-charcoal mb-4">Want to Sell Raffle Tickets?</h2>
          <p className="text-charcoal/60 mb-6">
            If you&apos;re a committee member or officer interested in selling raffle tickets,
            please contact us for your assigned ticket numbers.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-600 font-semibold transition-colors">
            Contact the Committee <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
