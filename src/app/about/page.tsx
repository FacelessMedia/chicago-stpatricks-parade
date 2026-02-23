import Link from "next/link";
import { Clover, ArrowRight, Ship, Users, Calendar, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "About | Chicago St. Patrick's Day Parade",
  description: "Learn about the history and tradition of the Chicago St. Patrick's Day Parade — one of the largest celebrations of Irish heritage in the United States.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 px-4 hero-gradient text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-emerald-400 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Clover className="w-16 h-16 text-gold-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-4 text-shadow">
            About the Parade
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto">
            A proud tradition celebrating Irish heritage in the heart of Chicago
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="A Tradition of Pride & Community"
            subtitle="The Chicago St. Patrick's Day Parade is one of the nation's largest and most iconic celebrations of Irish heritage."
          />
          <div className="prose prose-lg max-w-none text-charcoal/70 space-y-6 mt-8">
            <p>
              Every year, hundreds of thousands of Chicagoans and visitors line the streets of downtown
              Chicago to celebrate Irish heritage, culture, and community. The parade is a spectacular
              display of floats, marching bands, Irish dance troupes, bagpipers, and community organizations
              — all processing down Columbus Drive in a pageant of green and gold.
            </p>
            <p>
              The celebration extends far beyond the parade itself. The morning begins with the world-famous
              dyeing of the Chicago River, a tradition that dates back to 1962 when members of the Chicago
              Plumbers Union first poured green dye into the river. Today, the emerald river has become
              one of Chicago&apos;s most iconic images, drawing visitors from around the world.
            </p>
            <p>
              The Chicago St. Patrick&apos;s Day Parade Committee works year-round to organize this
              beloved celebration. The committee is comprised of dedicated volunteers who are passionate
              about preserving and promoting Irish heritage in the Chicago area. From securing corporate
              sponsors to coordinating parade logistics, the committee ensures that each year&apos;s parade
              is bigger and better than the last.
            </p>
            <p>
              The parade is more than an event — it&apos;s a reflection of the deep roots the Irish community
              has planted in Chicago. From the earliest Irish immigrants who helped build the city&apos;s
              infrastructure to today&apos;s thriving Irish-American community, the parade celebrates the
              enduring contribution of Irish Americans to the fabric of Chicago.
            </p>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="By the Numbers" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { icon: Users, number: "400,000+", label: "Annual Spectators" },
              { icon: Calendar, number: "60+", label: "Years of Tradition" },
              { icon: Ship, number: "1962", label: "First River Dyeing" },
              { icon: MapPin, number: "100+", label: "Parade Units" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 bg-cream rounded-2xl border border-emerald-100">
                <stat.icon className="w-8 h-8 text-emerald-700 mx-auto mb-4" />
                <p className="text-4xl font-bold text-emerald-800 font-heading mb-2">{stat.number}</p>
                <p className="text-charcoal/60 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The River */}
      <section className="py-20 px-4 bg-emerald-950 text-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="The Dyeing of the Chicago River"
            subtitle="An iconic tradition that has captivated the world since 1962"
            light
          />
          <div className="glass-card rounded-2xl p-8 mt-8">
            <div className="space-y-4 text-emerald-200 leading-relaxed">
              <p>
                The tradition of dyeing the Chicago River green began in 1962, when members of the Chicago
                Journeymen Plumbers Local Union 130 poured a special vegetable-based dye into the river.
                What started as a practical demonstration to detect illegal sewage dumping became one of
                the city&apos;s most beloved traditions.
              </p>
              <p>
                Each year on Parade Day morning, boats cruise along the Chicago River near Michigan Avenue,
                releasing an environmentally safe orange powder that reacts with the water to create a
                brilliant emerald green. The transformation typically lasts for several hours, giving
                spectators plenty of time to witness the spectacle.
              </p>
              <p>
                VIP and Executive package holders receive exclusive tickets aboard chartered boats that
                accompany the dyeing process, offering a once-in-a-lifetime front-row view of this
                extraordinary tradition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-cream text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-charcoal mb-4">
            Be Part of the Tradition
          </h2>
          <p className="text-charcoal/60 text-lg mb-8">
            Whether you&apos;re a first-time spectator or a longtime participant, the Chicago St. Patrick&apos;s
            Day Parade welcomes everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-full transition-all">
              Register to Participate <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/parade-info" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white font-semibold rounded-full transition-all">
              Parade Day Details
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
