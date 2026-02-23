import Link from "next/link";
import Image from "next/image";
import {
  Clover, Calendar, MapPin, Clock, Users, Ship,
  Crown, ArrowRight, Star, Utensils, Award, Music, Heart, Camera
} from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import SectionHeading from "@/components/SectionHeading";
import { PARADE_INFO, SPONSORS } from "@/lib/data";

export default function Home() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative -mt-16 sm:-mt-20 min-h-[100svh] flex items-center justify-center hero-gradient overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/20 rounded-full blur-[150px]" />
        </div>

        {/* Floating shamrocks */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Clover
              key={i}
              className="absolute text-emerald-400/10 animate-float"
              style={{
                width: `${30 + i * 15}px`,
                height: `${30 + i * 15}px`,
                left: `${10 + i * 15}%`,
                top: `${15 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
            <Clover className="w-4 h-4 text-gold-400" />
            <span className="text-emerald-200 text-sm font-medium">71st Annual · {PARADE_INFO.year}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-heading text-white mb-4 text-shadow leading-tight">
            Chicago St. Patrick&apos;s
            <br />
            <span className="shimmer-gold">Day Parade</span>
          </h1>

          <div className="mb-4">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gold-400/80 mb-1">2026 Theme</p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">
              {PARADE_INFO.theme}
            </p>
          </div>

          <p className="text-emerald-300/80 text-lg mb-10 max-w-2xl mx-auto">
            One of the nation&apos;s largest and most celebrated St. Patrick&apos;s Day parades.
            Join us in downtown Chicago for an unforgettable celebration of Irish heritage.
          </p>

          {/* Countdown */}
          <div className="mb-10">
            <p className="text-gold-400 text-sm uppercase tracking-widest mb-4 font-semibold">Countdown to Parade Day</p>
            <CountdownTimer targetDate={PARADE_INFO.paradeDate + "T12:00:00"} />
          </div>

          {/* CTA Buttons — parade-focused, not purchase-focused */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/parade-info"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold rounded-full text-lg transition-all duration-200 hover:shadow-xl hover:shadow-gold-500/25 hover:-translate-y-0.5"
            >
              Parade Day Details
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full text-lg border border-white/20 backdrop-blur-sm transition-all duration-200"
            >
              See All Events
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Calendar, label: "March 14, 2026", sub: "Parade Day" },
              { icon: MapPin, label: "Columbus Drive", sub: "Downtown Chicago" },
              { icon: Clock, label: "12:00 PM", sub: "Kick-off Time" },
              { icon: Ship, label: "9:00 AM", sub: "River Dyeing" },
            ].map((stat, i) => (
              <div key={i} className="glass-card rounded-xl p-4 text-center">
                <stat.icon className="w-5 h-5 text-gold-400 mx-auto mb-2" />
                <p className="text-white font-semibold text-sm">{stat.label}</p>
                <p className="text-emerald-300 text-xs">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-emerald-400 text-xs uppercase tracking-widest">Explore</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-400 to-transparent rounded-full" />
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                title="A Chicago Tradition Like No Other"
                subtitle="For decades, the Chicago St. Patrick's Day Parade has brought together hundreds of thousands to celebrate Irish heritage in the heart of the city."
                centered={false}
              />
              <div className="space-y-4 text-charcoal/70 leading-relaxed">
                <p>
                  Every year, Chicago turns its river emerald green, and the streets come alive with the sound
                  of bagpipes, the sight of vibrant floats, and the spirit of Irish pride. Our parade is more than
                  an event — it&apos;s a celebration of community, heritage, and the enduring bond between
                  Chicago and Ireland.
                </p>
                <p>
                  From the iconic dyeing of the Chicago River to the grand procession down Columbus Drive,
                  the Chicago St. Patrick&apos;s Day Parade is one of the largest and most beloved celebrations
                  of its kind in the United States.
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-full transition-all"
                >
                  Our History
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/parade-info"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white font-semibold rounded-full transition-all"
                >
                  Parade Info
                </Link>
              </div>
            </div>

            {/* Photo + Highlights */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/community-metra-kids.jpg"
                  alt="Chicago St. Patrick's Day Parade community celebration with families and kids"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Ship, title: "River Dyeing", desc: "Watch the Chicago River turn emerald green" },
                  { icon: Music, title: "Live Music", desc: "Bagpipes, Irish bands, and the sound of celebration" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 shadow-lg shadow-emerald-900/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-50"
                  >
                    <item.icon className="w-6 h-6 text-emerald-700 mb-2" />
                    <h3 className="font-bold text-charcoal text-sm mb-1">{item.title}</h3>
                    <p className="text-charcoal/60 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE RIVER DYEING ===== */}
      <section className="py-24 px-4 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-6">
                <Ship className="w-4 h-4 text-gold-400" />
                <span className="text-emerald-200 text-sm font-medium">A Chicago Original</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold font-heading mb-6 text-white">
                The Dyeing of the<br />
                <span className="text-emerald-300">Chicago River</span>
              </h2>
              <div className="space-y-4 text-emerald-200 leading-relaxed">
                <p>
                  Since 1962, the Chicago River has been transformed into a brilliant emerald green
                  on parade morning — one of the most iconic sights in all of Chicago and a tradition
                  recognized around the world.
                </p>
                <p>
                  Members of the Chicago Journeymen Plumbers Local Union 130 release an environmentally
                  safe dye that creates the stunning green transformation, drawing hundreds of thousands
                  to the riverbanks each year.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gold-400">
                  <Clock className="w-4 h-4" />
                  <span>9:00 AM on Parade Day</span>
                </div>
                <div className="flex items-center gap-2 text-gold-400">
                  <MapPin className="w-4 h-4" />
                  <span>Michigan Avenue</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "1962", label: "Year the tradition began" },
                { number: "400K+", label: "Spectators each year" },
                { number: "45 lbs", label: "Of vegetable dye used" },
                { number: "5 hrs", label: "The river stays green" },
              ].map((stat, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold text-gold-400 font-heading mb-1">{stat.number}</p>
                  <p className="text-emerald-300 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== GRAND MARSHAL & GUEST OF HONOR ===== */}
      <section className="py-24 px-4 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title={`${PARADE_INFO.year} Honorees`}
            subtitle="Meet this year's distinguished Grand Marshal and Guest of Honor"
            light
          />

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Grand Marshal */}
            <div className="glass-card rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gold-500/20 rounded-xl flex items-center justify-center">
                  <Star className="w-7 h-7 text-gold-400" />
                </div>
                <div>
                  <p className="text-gold-400 text-sm font-semibold uppercase tracking-wider">Grand Marshal</p>
                  <h3 className="text-2xl font-bold text-white font-heading">{PARADE_INFO.grandMarshal.name}</h3>
                </div>
              </div>
              <p className="text-emerald-200 leading-relaxed mb-6">{PARADE_INFO.grandMarshal.bio}</p>
              <Link href="/grand-marshal" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold text-sm transition-colors">
                Read Full Bio <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Guest of Honor */}
            <div className="glass-card rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gold-500/20 rounded-xl flex items-center justify-center">
                  <Award className="w-7 h-7 text-gold-400" />
                </div>
                <div>
                  <p className="text-gold-400 text-sm font-semibold uppercase tracking-wider">Guest of Honor</p>
                  <h3 className="text-2xl font-bold text-white font-heading">{PARADE_INFO.guestOfHonor.name}</h3>
                </div>
              </div>
              <p className="text-emerald-300 text-sm font-medium mb-3">{PARADE_INFO.guestOfHonor.subtitle}</p>
              <p className="text-emerald-200 leading-relaxed mb-6">{PARADE_INFO.guestOfHonor.bio}</p>
              <Link href="/guest-of-honor" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold text-sm transition-colors">
                Read More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Queen */}
          <div className="mt-8 glass-card rounded-2xl p-8 text-center max-w-2xl mx-auto hover:bg-white/15 transition-all">
            <Crown className="w-10 h-10 text-gold-400 mx-auto mb-4" />
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-wider mb-2">{PARADE_INFO.year} Parade Queen</p>
            <h3 className="text-3xl font-bold text-white font-heading mb-3">{PARADE_INFO.queen.name}</h3>
            <p className="text-emerald-200 leading-relaxed mb-6">{PARADE_INFO.queen.bio}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/queen-contest" className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-semibold rounded-full transition-all">
                Queen Contest History
              </Link>
              <a href={PARADE_INFO.queen.crownedLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-gold-500/50 text-gold-400 hover:bg-gold-500/10 font-semibold rounded-full transition-all">
                Watch the Crowning
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EVENTS SECTION ===== */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Celebrate With Us"
            subtitle="From the dyeing of the river to the grand parade, experience the best of Chicago's Irish celebrations"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                icon: Ship,
                title: "River Dyeing",
                date: "March 14 · 9:00 AM",
                desc: "Watch as the Chicago River turns a brilliant shade of emerald green — a tradition since 1962.",
                href: "/events",
              },
              {
                icon: Users,
                title: "The Parade",
                date: "March 14 · 12:00 PM",
                desc: "The main event — floats, bands, marching groups, and more processing down Columbus Drive.",
                href: "/parade-info",
              },
              {
                icon: Utensils,
                title: "CBC Dinner",
                date: "January 29 · Completed",
                desc: "The Annual Corned Beef & Cabbage Dinner — a beloved tradition bringing the community together.",
                href: "/events",
              },
              {
                icon: Crown,
                title: "Queen Contest",
                date: "Annual Tradition",
                desc: "Young women of Irish heritage compete for the honor of being crowned the Parade Queen.",
                href: "/queen-contest",
              },
            ].map((event, i) => (
              <Link
                key={i}
                href={event.href}
                className="group bg-cream rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100/50"
              >
                <div className="w-14 h-14 bg-emerald-100 group-hover:bg-emerald-200 rounded-xl flex items-center justify-center mb-5 transition-colors">
                  <event.icon className="w-7 h-7 text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-2">{event.title}</h3>
                <p className="text-emerald-700 text-sm font-medium mb-3">{event.date}</p>
                <p className="text-charcoal/60 text-sm leading-relaxed">{event.desc}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-full transition-all"
            >
              All Events & Details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHAT TO EXPECT ===== */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="What to Expect"
            subtitle="Your guide to experiencing one of America's greatest parades"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Ship, title: "The Green River", desc: "Arrive early to see the river dyed emerald green from the Michigan Avenue bridge — it's a sight you'll never forget." },
              { icon: Music, title: "Bagpipes & Bands", desc: "Dozens of marching bands, Irish pipe bands, and musical groups fill the streets with the sounds of Ireland." },
              { icon: Users, title: "Over 100 Units", desc: "Floats, dance troupes, community organizations, and more create a spectacle stretching the length of Columbus Drive." },
              { icon: Crown, title: "The Parade Queen", desc: "The crowned Parade Queen and her court ride in a place of honor, representing Chicago's Irish-American community." },
              { icon: Heart, title: "Community Spirit", desc: "Families, friends, and strangers come together to share in the pride and joy of Irish heritage in Chicago." },
              { icon: Camera, title: "Unforgettable Moments", desc: "From the green river to the final float, every moment is a photo opportunity you'll want to remember." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-emerald-100/50 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="font-bold text-charcoal mb-2">{item.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/parade-info"
              className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-600 font-semibold transition-colors"
            >
              Route, Timing & Tips <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SPONSORS ===== */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Our Proud Sponsors"
            subtitle="Thank you to the organizations that make this celebration possible"
          />

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {SPONSORS.map((sponsor, i) => (
              <div
                key={i}
                className="px-6 py-3 bg-cream rounded-xl text-charcoal/70 text-sm font-medium border border-emerald-100/50 hover:border-emerald-300 hover:text-emerald-800 transition-all duration-200"
              >
                {sponsor}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSING SECTION ===== */}
      <section className="py-24 px-4 hero-gradient text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 left-20 w-64 h-64 bg-emerald-400 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <Clover className="w-12 h-12 text-gold-400 mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl font-bold font-heading mb-6">
            Chicago Turns Green<br />
            <span className="shimmer-gold">Every March</span>
          </h2>
          <p className="text-emerald-200 text-lg mb-10 max-w-xl mx-auto">
            Whether you&apos;re watching from the riverbank, lining Columbus Drive, or gathering with
            family at the CBC dinner — this is your celebration. See you on Parade Day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold rounded-full text-lg transition-all hover:shadow-xl hover:shadow-gold-500/25"
            >
              Explore Our History
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 hover:bg-white/10 text-white font-semibold rounded-full text-lg transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
