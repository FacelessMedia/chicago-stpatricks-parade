import { Check, Flag, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PurchaseOptionsForm } from "@/components/PurchaseOptionsForm";
import { SalesClosedCard } from "@/components/SalesClosedCard";
import { ALA_CARTE_ITEMS } from "@/lib/data";
import { isPurchaseOpen } from "@/lib/season";

export const metadata = {
  title: "Light Pole Banners | Chicago St. Patrick's Day Parade",
  description: "Purchase a parade-route light pole banner displayed along Columbus Drive on Parade Day.",
};

export default function LightPoleBannerPage() {
  const product = ALA_CARTE_ITEMS.find((item) => item.id === "light-pole-banner");
  const options = product ? [{
    itemId: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    priceLabel: product.priceLabel,
    unitLabel: product.unit,
    maxQuantity: product.maxQuantity,
  }] : [];

  return (
    <>
      <section className="relative overflow-hidden px-4 py-28 text-center text-white hero-gradient">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-20 top-10 h-72 w-72 rounded-full bg-gold-500 blur-[110px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <Flag className="mx-auto mb-6 h-16 w-16 text-gold-400" />
          <h1 className="mb-4 text-4xl font-bold font-heading text-shadow sm:text-5xl md:text-6xl">
            Parade Route Light Pole Banner
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-emerald-200">
            Put your company, organization, or family name on Columbus Drive for Parade Day
          </p>
        </div>
      </section>

      <section className="bg-cream px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="Be Seen on the Parade Route" subtitle="A high-visibility way to support Chicago's Irish tradition" />
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-lg">
              <MapPin className="mb-5 h-10 w-10 text-emerald-700" />
              <h2 className="mb-5 text-2xl font-bold font-heading text-charcoal">Banner Details</h2>
              <ul className="space-y-4 text-charcoal/70">
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>Displayed on a light pole along Columbus Drive</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>Company, organization, or family name featured</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>$2,000 per banner</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>One banner is already included with every sponsorship package</span>
                </li>
              </ul>
            </div>

            {isPurchaseOpen() ? (
              <PurchaseOptionsForm
                title="Purchase a Banner"
                description="Choose the number of banners and enter the exact display name."
                options={options}
                noteLabel="Company or family name for the banner"
                notePlaceholder="Enter the name exactly as it should be displayed"
                noteRequired
                footnote="The committee will contact you for final artwork approval and placement details."
              />
            ) : (
              <SalesClosedCard title="Light Pole Banner Sales" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
