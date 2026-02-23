import Link from "next/link";
import { BookOpen, ArrowRight, Upload, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "Parade Ad Book | Chicago St. Patrick's Day Parade",
  description: "Advertise in the Official Chicago St. Patrick's Day Parade Ad Book.",
};

export default function AdBookPage() {
  return (
    <>
      <section className="relative py-32 px-4 hero-gradient text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <BookOpen className="w-16 h-16 text-gold-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-4 text-shadow">
            Official Parade Ad Book
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto">
            Showcase your organization in the official program distributed to thousands of parade-goers
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title="Ad Sizes & Options"
            subtitle="Choose the perfect ad placement for your organization"
          />

          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {[
              {
                name: "Full Page Color",
                desc: "Maximum impact with a full page color advertisement",
                features: ["Full page (8.5\" x 11\")", "Full color printing", "Premium placement", "Deadline: Jan 30, 2026"],
                highlight: true,
              },
              {
                name: "Full Page B&W",
                desc: "Classic full page black and white advertisement",
                features: ["Full page (8.5\" x 11\")", "Black & white printing", "Standard placement", "Deadline: Jan 30, 2026"],
                highlight: false,
              },
              {
                name: "Half Page B&W",
                desc: "Cost-effective half page ad — included with parade entry",
                features: ["Half page (8.5\" x 5.5\")", "Black & white printing", "Included with parade entry", "Deadline: Jan 30, 2026"],
                highlight: false,
              },
            ].map((ad, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 border flex flex-col ${
                  ad.highlight
                    ? "bg-emerald-800 text-white border-emerald-700 shadow-xl shadow-emerald-900/20"
                    : "bg-white text-charcoal border-emerald-100 shadow-lg shadow-emerald-900/5"
                }`}
              >
                {ad.highlight && (
                  <span className="inline-block px-3 py-1 bg-gold-500 text-emerald-950 text-xs font-bold rounded-full mb-4 self-start">
                    Best Value
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{ad.name}</h3>
                <p className={`text-sm mb-6 ${ad.highlight ? "text-emerald-200" : "text-charcoal/60"}`}>{ad.desc}</p>
                <ul className="space-y-2 flex-1 mb-6">
                  {ad.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Check className={`w-4 h-4 ${ad.highlight ? "text-gold-400" : "text-emerald-600"}`} />
                      <span className={ad.highlight ? "text-emerald-100" : "text-charcoal/70"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block text-center py-3 px-6 rounded-full font-semibold transition-all ${
                    ad.highlight
                      ? "bg-gold-500 hover:bg-gold-400 text-emerald-950"
                      : "bg-emerald-700 hover:bg-emerald-600 text-white"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionHeading title="Artwork Guidelines" />
          <div className="bg-cream rounded-2xl p-8 border border-emerald-100 mt-8">
            <Upload className="w-10 h-10 text-emerald-700 mb-4" />
            <h3 className="text-xl font-bold text-charcoal mb-4">Submission Requirements</h3>
            <ul className="space-y-3 text-charcoal/70">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>File formats:</strong> PDF (preferred), PNG, or high-resolution JPG</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Resolution:</strong> 300 DPI minimum for print quality</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Full Page:</strong> 8.5&quot; x 11&quot; with 0.25&quot; bleed</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Half Page:</strong> 8.5&quot; x 5.5&quot;</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Deadline:</strong> Friday, January 30, 2026</span>
              </li>
            </ul>
            <p className="mt-6 text-charcoal/60 text-sm">
              Don&apos;t have artwork ready? No problem — you can submit your artwork after registration.
              We&apos;ll send you reminders as the deadline approaches.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-cream text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold font-heading text-charcoal mb-4">Ready to Advertise?</h2>
          <p className="text-charcoal/60 mb-6">
            Register now and select your ad size during the registration process.
          </p>
          <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-full transition-all">
            Register Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
