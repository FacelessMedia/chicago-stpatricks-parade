import Link from "next/link";
import { ArrowRight, Heart, Clover } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { SPONSORS } from "@/lib/data";

export const metadata = {
  title: "Sponsors | Chicago St. Patrick's Day Parade",
  description: "Thank you to our proud sponsors who make the Chicago St. Patrick's Day Parade possible.",
};

export default function SponsorsPage() {
  return (
    <>
      <section className="relative py-32 px-4 hero-gradient text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Heart className="w-16 h-16 text-gold-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-4 text-shadow">
            Our Proud Sponsors
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto">
            Thank you to the organizations and individuals who make this celebration possible
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="2026 Sponsors"
            subtitle="These organizations proudly support the Chicago St. Patrick's Day Parade"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-12">
            {SPONSORS.map((sponsor, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-emerald-100 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center min-h-[120px]"
              >
                <Clover className="w-6 h-6 text-emerald-300 mb-3" />
                <p className="font-semibold text-charcoal text-sm">{sponsor}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 text-charcoal/40 text-sm">
            Sponsor logos will be displayed here once provided. Placeholder shown above.
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-emerald-950 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Become a Sponsor
          </h2>
          <p className="text-emerald-200 text-lg mb-8 max-w-xl mx-auto">
            Partner with one of the nation&apos;s most iconic parades and connect your brand
            with hundreds of thousands of spectators, media coverage, and community goodwill.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold rounded-full transition-all"
            >
              View Packages <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 hover:bg-white/10 text-white font-semibold rounded-full transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
