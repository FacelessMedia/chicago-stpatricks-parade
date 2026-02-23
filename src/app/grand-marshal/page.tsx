import Link from "next/link";
import { Star, ArrowRight, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PARADE_INFO } from "@/lib/data";

export const metadata = {
  title: "Grand Marshal | Chicago St. Patrick's Day Parade",
  description: `Meet the ${PARADE_INFO.year} Grand Marshal of the Chicago St. Patrick's Day Parade.`,
};

export default function GrandMarshalPage() {
  return (
    <>
      <section className="relative py-32 px-4 hero-gradient text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Star className="w-16 h-16 text-gold-400 mx-auto mb-6" />
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-4">{PARADE_INFO.year} Grand Marshal</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-4 text-shadow">
            {PARADE_INFO.grandMarshal.name}
          </h1>
        </div>
      </section>

      <section className="py-20 px-4 bg-cream">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-emerald-100 shadow-xl">
            <div className="prose prose-lg max-w-none text-charcoal/70 space-y-6">
              <p className="text-lg leading-relaxed">{PARADE_INFO.grandMarshal.bio}</p>
              <p>
                As Grand Marshal, {PARADE_INFO.grandMarshal.name.split(",")[0]} will lead the {PARADE_INFO.year} Chicago
                St. Patrick&apos;s Day Parade down Columbus Drive, embodying this year&apos;s theme of
                &ldquo;{PARADE_INFO.theme}&rdquo;.
              </p>
            </div>
            {PARADE_INFO.grandMarshal.website && (
              <a
                href={PARADE_INFO.grandMarshal.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-full transition-all"
              >
                Visit Website <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-600 font-semibold transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
