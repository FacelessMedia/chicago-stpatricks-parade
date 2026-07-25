import Link from "next/link";
import { Calendar, Check, Clock, MapPin, Utensils, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PurchaseOptionsForm } from "@/components/PurchaseOptionsForm";
import { SalesClosedCard } from "@/components/SalesClosedCard";
import { ALA_CARTE_ITEMS, PARADE_INFO } from "@/lib/data";
import { isPurchaseOpen } from "@/lib/season";

export const metadata = {
  title: "Corned Beef & Cabbage Dinner | Chicago St. Patrick's Day Parade",
  description: "Purchase individual seats or a table for 10 at the annual Corned Beef & Cabbage Dinner.",
};

export default function CbcDinnerPage() {
  const products = ALA_CARTE_ITEMS.filter((item) => item.id === "cbc-seat" || item.id === "cbc-table");
  const options = products.map((item) => ({
    itemId: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    priceLabel: item.priceLabel,
    unitLabel: item.unit,
    maxQuantity: item.maxQuantity,
  }));

  return (
    <>
      <section className="relative overflow-hidden px-4 py-28 text-center text-white hero-gradient">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-20 top-10 h-64 w-64 rounded-full bg-gold-500 blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <Utensils className="mx-auto mb-6 h-16 w-16 text-gold-400" />
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">A Parade Season Tradition</p>
          <h1 className="mb-4 text-4xl font-bold font-heading text-shadow sm:text-5xl md:text-6xl">
            Corned Beef &amp; Cabbage Dinner
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-emerald-200">
            Reserve individual seats or a full table for 10 guests
          </p>
        </div>
      </section>

      <section className="bg-cream px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Join Us for Dinner"
            subtitle="Traditional Irish fare, entertainment, sponsor recognition, and parade hospitality"
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-6">
              <div className="rounded-2xl border border-emerald-100 bg-white p-7 shadow-lg">
                <div className="space-y-4 text-sm text-charcoal/70">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-emerald-700" />
                    <span><strong>2027 date:</strong> To be announced</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-emerald-700" />
                    <span><strong>Time:</strong> {PARADE_INFO.cbcDinner.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-emerald-700" />
                    <span><strong>Location:</strong> To be announced</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-white p-7 shadow-lg">
                <h2 className="mb-5 text-xl font-bold font-heading text-charcoal">Ticket Options</h2>
                <ul className="space-y-4 text-charcoal/70">
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span><strong>Individual seats:</strong> $150 per guest</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span><strong>Full table:</strong> $1,500 for 10 guests</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span>Tables are included with every sponsorship package</span>
                  </li>
                </ul>
                <Link href="/packages" className="mt-6 inline-flex font-semibold text-emerald-700 hover:text-emerald-600">
                  Compare sponsorship packages
                </Link>
              </div>
            </div>

            {isPurchaseOpen() ? (
              <PurchaseOptionsForm
                title="Reserve Dinner Seating"
                description="Choose individual seats or a full table, then continue to secure sandbox checkout."
                options={options}
                noteLabel="Dietary or seating requests"
                notePlaceholder="Optional allergies, dietary needs, or seating notes"
                footnote="The committee will confirm the final 2027 date, time, venue, and seating details by email."
              />
            ) : (
              <SalesClosedCard title="CBC Dinner Ticket Sales" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
