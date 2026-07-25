import Link from "next/link";
import { Gift, ArrowRight, AlertTriangle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PurchaseCard } from "@/components/PurchaseCard";
import { SalesClosedCard } from "@/components/SalesClosedCard";
import { isPurchaseOpen } from "@/lib/season";

export const metadata = {
  title: "Raffle Tickets | Chicago St. Patrick's Day Parade",
  description:
    "Annual raffle — only 750 tickets sold at $100 each. Win $25,000 cash or roundtrip tickets to Dublin, Ireland.",
};

export default function RafflePage() {
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
            {isPurchaseOpen() ? (
              <PurchaseCard
                itemId="raffle"
                title="Raffle Tickets"
                pricePerUnit={pricePerTicket}
                unitLabel="ticket"
                maxQuantity={10}
                initialQuantity={1}
                footnote="Your official ticket numbers will be emailed to you once payment is confirmed."
                icon
              />
            ) : (
              <SalesClosedCard title="Raffle Ticket Sales" />
            )}
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
