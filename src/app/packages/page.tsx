import Link from "next/link";
import { ArrowRight, Check, Ticket } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PackageCard from "@/components/PackageCard";
import { PACKAGES, ALA_CARTE_ITEMS } from "@/lib/data";

export const metadata = {
  title: "Packages | Chicago St. Patrick's Day Parade",
  description: "Sponsorship packages and à la carte options for the Chicago St. Patrick's Day Parade.",
};

export default function PackagesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 px-4 hero-gradient text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-4 text-shadow">
            Sponsorship Packages
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto">
            Partner with one of the nation&apos;s most iconic parades. Choose the package that best represents your organization.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Choose Your Package"
            subtitle="Each package includes a comprehensive suite of benefits to maximize your organization's visibility"
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {PACKAGES.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Package Comparison */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Package Comparison" subtitle="See what's included in each package at a glance" />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-emerald-200">
                  <th className="text-left py-4 px-4 text-charcoal font-bold">Feature</th>
                  <th className="text-center py-4 px-4 text-emerald-800 font-bold">Premier</th>
                  <th className="text-center py-4 px-4 text-emerald-800 font-bold">Executive</th>
                  <th className="text-center py-4 px-4 bg-gold-50 text-gold-600 font-bold rounded-t-lg">VIP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "CBC Dinner Table (10 guests)", premier: "Premier", executive: "Executive", vip: "VIP" },
                  { feature: "Parade Ad Book", premier: "Full Page B&W", executive: "Full Color", vip: "Full Color" },
                  { feature: "Jumbo Screen Ad", premier: true, executive: true, vip: true },
                  { feature: "Parade Entry", premier: true, executive: true, vip: true },
                  { feature: "Light Pole Banner", premier: true, executive: true, vip: true },
                  { feature: "River Boat Tickets", premier: "2", executive: "4", vip: "6" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-emerald-100">
                    <td className="py-4 px-4 text-charcoal/70">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {row.premier === true ? <Check className="w-5 h-5 text-emerald-600 mx-auto" /> : <span className="text-charcoal/60">{row.premier}</span>}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row.executive === true ? <Check className="w-5 h-5 text-emerald-600 mx-auto" /> : <span className="text-charcoal/60">{row.executive}</span>}
                    </td>
                    <td className="py-4 px-4 text-center bg-gold-50/50">
                      {row.vip === true ? <Check className="w-5 h-5 text-gold-600 mx-auto" /> : <span className="text-gold-600 font-semibold">{row.vip}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* À La Carte */}
      <section id="a-la-carte" className="py-20 px-4 bg-emerald-950 text-white scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="À La Carte Options"
            subtitle="Not ready for a full package? Purchase individual items to participate in the celebration"
            light
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {ALA_CARTE_ITEMS.map((item) => (
              <div key={item.id} className="glass-card rounded-2xl p-6 hover:bg-white/15 transition-all">
                <Ticket className="w-8 h-8 text-gold-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                <p className="text-gold-400 font-semibold text-sm mb-3">{item.priceLabel}</p>
                <p className="text-emerald-200 text-sm leading-relaxed mb-4">{item.description}</p>
                {item.limited && (
                  <span className="inline-block px-3 py-1 bg-red-500/20 text-red-300 text-xs font-bold rounded-full mb-4">
                    Limited — Only {item.maxQuantity} Available
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-cream text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-charcoal mb-4">Ready to Get Started?</h2>
          <p className="text-charcoal/60 text-lg mb-8">
            Register today to secure your spot in one of the nation&apos;s most celebrated parades.
          </p>
          <Link href="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-full text-lg transition-all">
            Register Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
