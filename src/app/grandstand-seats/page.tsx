import Link from "next/link";
import { Ticket, MapPin, ArrowRight, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PurchaseCard } from "@/components/PurchaseCard";
import { SalesClosedCard } from "@/components/SalesClosedCard";
import { isPurchaseOpen } from "@/lib/season";

export const metadata = {
  title: "Grandstand Seats | Chicago St. Patrick's Day Parade",
  description:
    "Reserve grandstand seating along Columbus Drive for the Chicago St. Patrick's Day Parade — $65 per seat.",
};

export default function GrandstandSeatsPage() {
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
                  Columbus Drive, Chicago — Parade Day, March 13, 2027
                </div>
              </div>
            </div>

            {/* Purchase Card */}
            {isPurchaseOpen() ? (
              <PurchaseCard
                itemId="grandstand"
                title="Grandstand Seats"
                pricePerUnit={65}
                unitLabel="seat"
                maxQuantity={50}
                initialQuantity={2}
                footnote="A confirmation email will follow with your ticket details. Purchase deadline: Monday, March 8, 2027."
              />
            ) : (
              <SalesClosedCard title="Grandstand Seat Sales" />
            )}
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
