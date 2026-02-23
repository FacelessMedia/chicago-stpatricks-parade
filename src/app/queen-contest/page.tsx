import Link from "next/link";
import Image from "next/image";
import { Crown, ArrowRight, Clover } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { QUEEN_CONTEST_HISTORY, PARADE_INFO } from "@/lib/data";

export const metadata = {
  title: "Queen Contest | Chicago St. Patrick's Day Parade",
  description: "The history of the Chicago St. Patrick's Day Parade Queen Contest — honoring young women of Irish heritage since its inception.",
};

export default function QueenContestPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 px-4 hero-gradient text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-emerald-400 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Crown className="w-16 h-16 text-gold-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-4 text-shadow">
            The Queen Contest
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto">
            A cherished tradition honoring young women of Irish heritage who represent
            the spirit and pride of Chicago&apos;s Irish-American community.
          </p>
        </div>
      </section>

      {/* 2026 Queen — Claire Cahill */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100 border border-gold-200 mb-6">
                <Crown className="w-4 h-4 text-gold-600" />
                <span className="text-gold-600 text-sm font-semibold">{PARADE_INFO.year} Parade Queen</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold font-heading text-charcoal mb-4">
                {PARADE_INFO.queen.name}
              </h2>
              <div className="space-y-4 text-charcoal/70 leading-relaxed">
                <p>
                  Congratulations to Claire Cahill, who was crowned the 2026 Chicago St. Patrick&apos;s Day
                  Parade Queen on January 11, 2026! Claire emerged from a field of talented young women of
                  Irish heritage to claim the crown, and she will represent the parade and Chicago&apos;s
                  Irish-American community throughout the 2026 parade season.
                </p>
                <p>
                  As Queen, Claire will lead the parade procession alongside Grand Marshal
                  Rev. Thomas R. McCarthy, O.S.A. and Guest of Honor The Shannon Rovers, riding in a
                  place of honor down Columbus Drive on March 14, 2026.
                </p>
                <p>
                  Claire and her court have already been busy representing the parade at community events
                  across the Chicagoland area, spreading Irish pride and building excitement for parade season.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/queen-crowned-flags.jpg"
                  alt="Claire Cahill crowned as the 2026 Chicago St. Patrick's Day Parade Queen"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABC7 Video Embed */}
      <section className="py-20 px-4 bg-emerald-950 text-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="Watch the Crowning"
            subtitle="ABC7 Chicago covered Claire Cahill's crowning as the 2026 Parade Queen"
            light
          />
          <div className="mt-8 rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
            <iframe
              src="https://abc7chicago.com/video/embed/?pid=18388388"
              className="w-full h-full"
              allowFullScreen
              title="ABC7 Chicago - Claire Cahill crowned 2026 Chicago St. Patrick's Day Parade Queen"
            />
          </div>
          <p className="text-center mt-4 text-emerald-400 text-sm">
            Video courtesy of{" "}
            <a
              href={PARADE_INFO.queen.crownedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 underline underline-offset-4"
            >
              ABC7 Chicago
            </a>
          </p>
        </div>
      </section>

      {/* Queen & Court Photo Gallery */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="The 2026 Queen & Her Court"
            subtitle="Claire and her court representing the parade across the Chicagoland area"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            {[
              { src: "/images/queen-court-stage.jpg", alt: "2026 Queen and Court on stage at crowning ceremony" },
              { src: "/images/queen-green-river.jpg", alt: "Queen Claire at the green Chicago River" },
              { src: "/images/queen-court-emerald-isle.jpg", alt: "Queen and court at Emerald Isle, Edison Park" },
              { src: "/images/queen-court-elis.jpg", alt: "Queen and court visiting Eli's Cheesecake" },
              { src: "/images/queen-court-bw-laughing.jpg", alt: "Queen and court celebrating together" },
              { src: "/images/queen-court-full-length.jpg", alt: "Queen and court full group photo" },
            ].map((img, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Contest */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="About the Queen Contest"
            subtitle="A tradition of grace, heritage, and community pride"
          />
          <div className="prose prose-lg max-w-none text-charcoal/70 space-y-6">
            <p>
              The Chicago St. Patrick&apos;s Day Parade Queen Contest is one of the most prestigious traditions
              associated with the annual parade. Each year, young women of Irish heritage from across the
              Chicagoland area compete for the honor of being crowned the Parade Queen.
            </p>
            <p>
              The Queen Contest celebrates the values of Irish culture — grace, intelligence, community spirit,
              and pride in one&apos;s heritage. Contestants are evaluated on their knowledge of Irish culture and
              history, their involvement in the community, their poise, and their ability to represent the
              parade and Chicago&apos;s Irish-American community throughout the year.
            </p>
            <p>
              The reigning Queen leads the parade procession alongside the Grand Marshal and Guest of Honor,
              riding in a place of honor through the streets of downtown Chicago. She serves as an ambassador
              for the Irish community at events throughout the year, representing the best of Chicago&apos;s
              Irish-American heritage.
            </p>
            <div className="bg-white rounded-2xl p-8 border border-emerald-100 mt-8">
              <h3 className="text-xl font-bold text-charcoal mb-3 flex items-center gap-2">
                <Clover className="w-5 h-5 text-emerald-600" />
                Interested in Competing?
              </h3>
              <p className="text-charcoal/70 mb-4">
                The Queen Contest is open to young women of Irish heritage from the Chicagoland area.
                Registration typically opens in the fall for the following year&apos;s parade. The 2026 contest
                took place on January 11, 2026, with registration closing on January 5, 2026.
              </p>
              <p className="text-charcoal/60 text-sm">
                Contact us at{" "}
                <a href="mailto:parade@chicagostpatricksdayparade.com" className="text-emerald-700 hover:text-emerald-600 font-semibold">
                  parade@chicagostpatricksdayparade.com
                </a>
                {" "}for more information about future contests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Queens */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title="Past Parade Queens"
            subtitle="Honoring the remarkable women who have represented our parade through the years"
          />

          <div className="mt-12 space-y-0">
            {QUEEN_CONTEST_HISTORY.map((queen, i) => (
              <div
                key={queen.year}
                className="group relative flex items-start gap-6 py-8 border-b border-emerald-100 last:border-0 hover:bg-emerald-50/50 -mx-6 px-6 rounded-xl transition-colors"
              >
                {/* Year Badge */}
                <div className="shrink-0 w-20 h-20 bg-emerald-800 rounded-2xl flex items-center justify-center group-hover:bg-gold-500 transition-colors duration-300">
                  <span className="text-white group-hover:text-emerald-950 font-bold text-lg transition-colors">{queen.year}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-charcoal">{queen.name}</h3>
                    {i === 0 && (
                      <span className="px-3 py-1 bg-gold-100 text-gold-600 text-xs font-bold rounded-full uppercase">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-charcoal/60 leading-relaxed">{queen.description}</p>
                </div>

                <Crown className="w-5 h-5 text-emerald-200 group-hover:text-gold-500 shrink-0 mt-2 transition-colors" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-8 bg-cream rounded-2xl border border-emerald-100">
            <p className="text-charcoal/60 mb-2">
              We are actively compiling the complete historical record of all Parade Queens.
            </p>
            <p className="text-charcoal/60">
              If you are a past Queen or have information about past Queens,
              please <Link href="/contact" className="text-emerald-700 hover:text-emerald-600 font-semibold underline underline-offset-4">contact us</Link> to help preserve this important history.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Want to Be the Next Queen?
          </h2>
          <p className="text-emerald-200 text-lg mb-8">
            Registration for the next Queen Contest opens in the fall.
            Stay connected to be the first to know when applications are available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold rounded-full transition-all"
            >
              Contact Us for Details
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
