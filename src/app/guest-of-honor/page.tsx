import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";
import { PARADE_INFO } from "@/lib/data";

export const metadata = {
  title: "Guest of Honor | Chicago St. Patrick's Day Parade",
  description: `Meet the ${PARADE_INFO.year} Guest of Honor of the Chicago St. Patrick's Day Parade.`,
};

export default function GuestOfHonorPage() {
  return (
    <>
      <section className="relative py-32 px-4 hero-gradient text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Award className="w-16 h-16 text-gold-400 mx-auto mb-6" />
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-4">{PARADE_INFO.year} Guest of Honor</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-4 text-shadow">
            {PARADE_INFO.guestOfHonor.name}
          </h1>
          <p className="text-xl text-emerald-200">{PARADE_INFO.guestOfHonor.subtitle}</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-cream">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-emerald-100 shadow-xl">
            <div className="prose prose-lg max-w-none text-charcoal/70 space-y-6">
              <p className="text-lg leading-relaxed">{PARADE_INFO.guestOfHonor.bio}</p>
              <p>
                The Shannon Rovers will be honored throughout the {PARADE_INFO.year} parade season,
                celebrating a century of Irish music and culture in the city of Chicago.
                Their performances have been a cornerstone of Chicago&apos;s Irish identity, and this
                milestone anniversary marks an extraordinary achievement in cultural preservation.
              </p>
              <p>
                Founded in 1926, the same year as this parade&apos;s {PARADE_INFO.year} celebration, the
                Shannon Rovers have performed at countless civic events, cultural celebrations, and
                community gatherings. Their dedication to traditional Irish pipe band music has inspired
                generations of musicians and kept the spirit of Ireland alive in the heart of America.
              </p>
            </div>
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
