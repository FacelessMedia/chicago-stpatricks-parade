import Link from "next/link";
import { MapPin, Clock, Calendar, Car, Train, AlertTriangle, Ticket, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CountdownTimer from "@/components/CountdownTimer";
import { PARADE_INFO } from "@/lib/data";

export const metadata = {
  title: "Parade Info | Chicago St. Patrick's Day Parade",
  description: "Everything you need to know about the Chicago St. Patrick's Day Parade — route, timing, transportation, and tips.",
};

export default function ParadeInfoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 px-4 hero-gradient text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-4 text-shadow">
            Parade Day Information
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto mb-8">
            Everything you need to know for the {PARADE_INFO.year} Chicago St. Patrick&apos;s Day Parade
          </p>
          <CountdownTimer targetDate={PARADE_INFO.paradeDate + "T12:00:00"} />
        </div>
      </section>

      {/* Key Details */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Key Details" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              { icon: Calendar, title: "Date", detail: "Saturday, March 14, 2026" },
              { icon: Clock, title: "Parade Start", detail: "12:00 PM" },
              { icon: MapPin, title: "Route", detail: "Columbus Drive, Balbo to Monroe" },
              { icon: Clock, title: "River Dyeing", detail: "9:00 AM at Michigan Ave" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-emerald-100 text-center">
                <item.icon className="w-8 h-8 text-emerald-700 mx-auto mb-3" />
                <h3 className="font-bold text-charcoal mb-1">{item.title}</h3>
                <p className="text-charcoal/60 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parade Route */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="Parade Route"
            subtitle="The parade processes north along Columbus Drive in Grant Park"
          />
          <div className="mt-8 bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm">S</div>
                <div>
                  <h3 className="font-bold text-charcoal">Start: Balbo Drive & Columbus Drive</h3>
                  <p className="text-charcoal/60 text-sm">The parade kicks off at the south end of Grant Park</p>
                </div>
              </div>
              <div className="ml-5 border-l-2 border-emerald-300 h-12 border-dashed" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm">R</div>
                <div>
                  <h3 className="font-bold text-charcoal">Review Stand</h3>
                  <p className="text-charcoal/60 text-sm">Located along Columbus Drive — grandstand seating available for purchase</p>
                </div>
              </div>
              <div className="ml-5 border-l-2 border-emerald-300 h-12 border-dashed" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center shrink-0 text-emerald-950 font-bold text-sm">E</div>
                <div>
                  <h3 className="font-bold text-charcoal">End: Monroe Street & Columbus Drive</h3>
                  <p className="text-charcoal/60 text-sm">The parade concludes at the north end near Millennium Park</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-20 px-4 bg-emerald-950 text-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Getting There" subtitle="Plan your trip to the parade" light />
          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <div className="glass-card rounded-2xl p-6">
              <Train className="w-8 h-8 text-gold-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Public Transit (Recommended)</h3>
              <ul className="space-y-2 text-emerald-200 text-sm">
                <li>• CTA Red, Blue, Brown, Green, Orange, Pink Lines to the Loop</li>
                <li>• Metra trains to Millennium Station or Van Buren Station</li>
                <li>• CTA buses along Michigan Avenue</li>
                <li>• Public transit is the best way to avoid traffic and parking hassles</li>
              </ul>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <Car className="w-8 h-8 text-gold-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Driving & Parking</h3>
              <ul className="space-y-2 text-emerald-200 text-sm">
                <li>• Millennium Park Garage (underground)</li>
                <li>• Grant Park North & South Garages</li>
                <li>• Street parking is extremely limited on parade day</li>
                <li>• Arrive early — garages fill up quickly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Parade Day Tips" />
          <div className="mt-8 space-y-4">
            {[
              { icon: AlertTriangle, tip: "Arrive early! The best viewing spots fill up fast, especially near the review stand." },
              { icon: AlertTriangle, tip: "Dress warmly — March in Chicago can be cold. Layers are your friend." },
              { icon: AlertTriangle, tip: "Grandstand seats are available for purchase and offer the best reserved viewing experience." },
              { icon: AlertTriangle, tip: "The river dyeing begins at 9:00 AM — head to Michigan Avenue bridge for the best views." },
              { icon: AlertTriangle, tip: "Use public transportation when possible. Road closures will be in effect around the parade route." },
              { icon: AlertTriangle, tip: "Bring the family! The parade is a family-friendly event with something for everyone." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-emerald-100">
                <item.icon className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <p className="text-charcoal/70">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <Ticket className="w-10 h-10 text-emerald-700 mx-auto mb-4" />
          <h2 className="text-3xl font-bold font-heading text-charcoal mb-4">Get Your Grandstand Seats</h2>
          <p className="text-charcoal/60 mb-6">Secure the best views along the parade route with reserved grandstand seating.</p>
          <Link href="/grandstand-seats" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-full transition-all">
            Purchase Seats — $65 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
