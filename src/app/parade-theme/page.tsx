import Link from "next/link";
import { Clover, ArrowRight } from "lucide-react";
import { PARADE_INFO } from "@/lib/data";

export const metadata = {
  title: "Parade Theme | Chicago St. Patrick's Day Parade",
  description: `The ${PARADE_INFO.year} Chicago St. Patrick's Day Parade theme: ${PARADE_INFO.theme}`,
};

export default function ParadeThemePage() {
  return (
    <>
      <section className="relative py-32 px-4 hero-gradient text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-emerald-400 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Clover className="w-16 h-16 text-gold-400 mx-auto mb-6" />
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-4">{PARADE_INFO.year} Parade Theme</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-heading mb-6 text-shadow">
            <span className="shimmer-gold">{PARADE_INFO.theme}</span>
          </h1>
        </div>
      </section>

      <section className="py-20 px-4 bg-cream">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-emerald-100 shadow-xl">
            <div className="prose prose-lg max-w-none text-charcoal/70 space-y-6">
              <p>
                The {PARADE_INFO.year} Chicago St. Patrick&apos;s Day Parade proudly carries the theme
                <strong className="text-emerald-800"> &ldquo;{PARADE_INFO.theme}&rdquo;</strong> — a message
                that resonates deeply with the values of the Irish-American community and the spirit of
                St. Patrick himself.
              </p>
              <p>
                This year&apos;s theme reflects the three pillars that have sustained the Irish community
                through centuries of challenge and triumph:
              </p>
              <div className="grid sm:grid-cols-3 gap-6 my-8">
                {[
                  { word: "Faith", desc: "The enduring spiritual foundation that has guided the Irish people through adversity and celebration alike." },
                  { word: "Peace", desc: "A commitment to harmony, understanding, and goodwill — values St. Patrick himself championed." },
                  { word: "Unity", desc: "The strength found in coming together as one community, regardless of background or origin." },
                ].map((item) => (
                  <div key={item.word} className="text-center p-6 bg-emerald-50 rounded-xl border border-emerald-100">
                    <h3 className="text-2xl font-bold text-emerald-800 font-heading mb-3">{item.word}</h3>
                    <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p>
                Under the leadership of Grand Marshal {PARADE_INFO.grandMarshal.name} and with the
                Shannon Rovers celebrating their historic 100th anniversary as Guest of Honor, this
                year&apos;s parade embodies the theme in every float, every band, and every marching unit
                that processes down Columbus Drive.
              </p>
              <p>
                We invite all participants to incorporate the theme of {PARADE_INFO.theme} into their
                parade entries, ad book advertisements, and celebrations throughout the season.
              </p>
            </div>
          </div>

          <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-full transition-all">
              Register to Participate <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white font-semibold rounded-full transition-all">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
