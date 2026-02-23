"use client";

import { useState } from "react";
import Link from "next/link";
import { Ticket, MapPin, ArrowRight, Minus, Plus, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export default function GrandstandSeatsPage() {
  const [quantity, setQuantity] = useState(2);
  const pricePerSeat = 65;

  return (
    <>
      <section className="relative py-32 px-4 hero-gradient text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Ticket className="w-16 h-16 text-gold-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-4 text-shadow">
            Grandstand Seats
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto">
            Reserved seating along the parade route — the best way to experience the parade
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <SectionHeading title="Reserve Your Seats" centered={false} />
              <div className="space-y-6 text-charcoal/70">
                <p>
                  Get the best views of the Chicago St. Patrick&apos;s Day Parade with reserved
                  grandstand seating along Columbus Drive. Grandstand seats are located near the
                  review stand, offering a premium viewing experience of every float, band, and
                  marching group as they pass by.
                </p>
                <div className="space-y-3">
                  {[
                    "Reserved seating — no need to arrive early to save a spot",
                    "Premium location along the parade route",
                    "Near the TV review stand for the best action",
                    "Great for families, groups, and corporate outings",
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-medium">
                  <MapPin className="w-5 h-5" />
                  Columbus Drive, Chicago — Parade Day, March 14, 2026
                </div>
              </div>
            </div>

            {/* Purchase Card */}
            <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-xl h-fit sticky top-28">
              <h3 className="text-2xl font-bold text-charcoal font-heading mb-2">Purchase Tickets</h3>
              <p className="text-3xl font-bold text-emerald-800 mb-6">${pricePerSeat} <span className="text-base font-normal text-charcoal/60">per seat</span></p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Number of Seats</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full border-2 border-emerald-200 flex items-center justify-center hover:border-emerald-500 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-charcoal" />
                    </button>
                    <span className="text-2xl font-bold text-charcoal w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full border-2 border-emerald-200 flex items-center justify-center hover:border-emerald-500 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-charcoal" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-emerald-100 pt-5">
                  <div className="flex justify-between text-sm text-charcoal/60 mb-2">
                    <span>{quantity} × ${pricePerSeat}</span>
                    <span>${quantity * pricePerSeat}.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-charcoal">
                    <span>Total</span>
                    <span className="text-emerald-800">${quantity * pricePerSeat}.00</span>
                  </div>
                </div>

                <a
                  href="https://www.jotform.com/form/252753400225448"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-8 py-4 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold rounded-full transition-all text-lg text-center"
                >
                  Purchase Seats
                </a>

                <p className="text-charcoal/40 text-xs text-center">
                  You&apos;ll be directed to our secure purchase form. A confirmation email will follow with your ticket details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold font-heading text-charcoal mb-4">Want the Full Experience?</h2>
          <p className="text-charcoal/60 mb-6">
            Our sponsorship packages include premium seating and much more — CBC dinner tables,
            parade ads, boat tickets, and more.
          </p>
          <Link href="/packages" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-600 font-semibold transition-colors">
            View Packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
