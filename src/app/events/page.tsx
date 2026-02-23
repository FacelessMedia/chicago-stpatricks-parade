import Link from "next/link";
import { Ship, Users, Utensils, Crown, Music, Calendar, Clock, MapPin, ArrowRight, Ticket } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PARADE_INFO } from "@/lib/data";

export const metadata = {
  title: "Events | Chicago St. Patrick's Day Parade",
  description: "Annual events surrounding the Chicago St. Patrick's Day Parade — river dyeing, CBC dinner, queen contest, and more.",
};

export default function EventsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 px-4 hero-gradient text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Calendar className="w-16 h-16 text-gold-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-4 text-shadow">
            {PARADE_INFO.year} Events
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto">
            A full weekend of celebration, tradition, and Irish pride in the heart of Chicago
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Schedule of Events" subtitle="Mark your calendars for these signature celebrations" />

          <div className="mt-12 space-y-8">
            {/* CBC Dinner */}
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-emerald-100 shadow-lg shadow-emerald-900/5">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="hidden sm:flex w-16 h-16 bg-emerald-100 rounded-2xl items-center justify-center shrink-0">
                  <Utensils className="w-8 h-8 text-emerald-700" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-charcoal font-heading">Annual Corned Beef & Cabbage Dinner</h3>
                    <span className="px-3 py-1 bg-charcoal/10 text-charcoal/50 text-xs font-bold rounded-full uppercase">Event Completed</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <span className="flex items-center gap-1.5 text-charcoal/50"><Calendar className="w-4 h-4" /> Thursday, January 29, 2026</span>
                    <span className="flex items-center gap-1.5 text-charcoal/50"><Clock className="w-4 h-4" /> 6:00 PM</span>
                    <span className="flex items-center gap-1.5 text-charcoal/50"><MapPin className="w-4 h-4" /> Chicago</span>
                  </div>
                  <p className="text-charcoal/70 leading-relaxed mb-4">
                    The Annual Corned Beef & Cabbage Dinner is one of the highlights of the parade season.
                    Hundreds of guests gathered for an evening of traditional Irish food, entertainment, and camaraderie.
                    The dinner featured jumbo screen video advertisements, the presentation of the Grand Marshal
                    and Guest of Honor, and plenty of Irish hospitality.
                  </p>
                  <p className="text-charcoal/70 leading-relaxed mb-6">
                    Tables for 10 guests are included with all sponsorship packages.
                  </p>
                  <div className="flex gap-4">
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal/10 text-charcoal/40 font-semibold rounded-full text-sm cursor-not-allowed">
                      See You Next Year!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* River Dyeing */}
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-emerald-100 shadow-lg shadow-emerald-900/5">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="hidden sm:flex w-16 h-16 bg-emerald-100 rounded-2xl items-center justify-center shrink-0">
                  <Ship className="w-8 h-8 text-emerald-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-charcoal font-heading mb-3">Dyeing of the Chicago River</h3>
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <span className="flex items-center gap-1.5 text-emerald-700"><Calendar className="w-4 h-4" /> Saturday, March 14, 2026</span>
                    <span className="flex items-center gap-1.5 text-emerald-700"><Clock className="w-4 h-4" /> 9:00 AM</span>
                    <span className="flex items-center gap-1.5 text-emerald-700"><MapPin className="w-4 h-4" /> Chicago River at Michigan Avenue</span>
                  </div>
                  <p className="text-charcoal/70 leading-relaxed mb-4">
                    A tradition since 1962, the dyeing of the Chicago River is one of the most iconic sights
                    in all of Chicago. Watch as boats release an environmentally safe dye that transforms the
                    river into a stunning shade of emerald green. VIP and Executive package holders receive
                    exclusive tickets aboard chartered boats to witness the dyeing up close.
                  </p>
                  <div className="bg-gold-50 rounded-xl p-4 border border-gold-200">
                    <p className="text-gold-600 text-sm font-medium">
                      <Ship className="w-4 h-4 inline mr-1" />
                      Boat tickets are included with VIP (6 tickets), Executive (4 tickets), and Premier (2 tickets) packages.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Parade */}
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-emerald-100 shadow-lg shadow-emerald-900/5">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="hidden sm:flex w-16 h-16 bg-emerald-100 rounded-2xl items-center justify-center shrink-0">
                  <Users className="w-8 h-8 text-emerald-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-charcoal font-heading mb-3">The {PARADE_INFO.year} Parade</h3>
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <span className="flex items-center gap-1.5 text-emerald-700"><Calendar className="w-4 h-4" /> Saturday, March 14, 2026</span>
                    <span className="flex items-center gap-1.5 text-emerald-700"><Clock className="w-4 h-4" /> 12:00 PM</span>
                    <span className="flex items-center gap-1.5 text-emerald-700"><MapPin className="w-4 h-4" /> Columbus Drive, Balbo to Monroe</span>
                  </div>
                  <p className="text-charcoal/70 leading-relaxed mb-4">
                    The main event! Over 100 units including floats, marching bands, Irish dance troupes,
                    bagpipe bands, and community organizations process down Columbus Drive. Led by the
                    Grand Marshal {PARADE_INFO.grandMarshal.name} and Guest of Honor {PARADE_INFO.guestOfHonor.name},
                    this year&apos;s theme is &ldquo;{PARADE_INFO.theme}&rdquo;.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Link href="/grandstand-seats" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-full transition-all text-sm">
                      <Ticket className="w-4 h-4" /> Grandstand Seats — $65
                    </Link>
                    <Link href="/parade-info" className="inline-flex items-center justify-center gap-2 text-emerald-700 hover:text-emerald-600 font-semibold text-sm transition-colors">
                      Route & Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Queen Contest */}
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-emerald-100 shadow-lg shadow-emerald-900/5">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="hidden sm:flex w-16 h-16 bg-gold-100 rounded-2xl items-center justify-center shrink-0">
                  <Crown className="w-8 h-8 text-gold-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-charcoal font-heading mb-3">Queen Contest</h3>
                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <span className="flex items-center gap-1.5 text-emerald-700"><Calendar className="w-4 h-4" /> Annual Event</span>
                    <span className="flex items-center gap-1.5 text-gold-600"><Crown className="w-4 h-4" /> {PARADE_INFO.year} Queen: {PARADE_INFO.queen.name}</span>
                  </div>
                  <p className="text-charcoal/70 leading-relaxed mb-4">
                    The Queen Contest is one of the parade&apos;s most cherished traditions. Young women of
                    Irish heritage from the Chicagoland area compete for the honor of being crowned the
                    Parade Queen. The Queen leads the parade and serves as an ambassador for the Irish
                    community throughout the year.
                  </p>
                  <Link href="/queen-contest" className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-semibold rounded-full transition-all text-sm">
                    Queen Contest History <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Entertainment */}
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-emerald-100 shadow-lg shadow-emerald-900/5">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="hidden sm:flex w-16 h-16 bg-emerald-100 rounded-2xl items-center justify-center shrink-0">
                  <Music className="w-8 h-8 text-emerald-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-charcoal font-heading mb-3">Live Entertainment</h3>
                  <p className="text-charcoal/70 leading-relaxed">
                    The parade features incredible live entertainment including bagpipe bands, Irish dance
                    troupes, high school and military marching bands, and much more. This year&apos;s Guest
                    of Honor, The Shannon Rovers, will be celebrating their 100th anniversary with a special
                    performance. The parade is a feast for the ears as much as the eyes!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
