import { Mail, MapPin, Clover } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "Contact | Chicago St. Patrick's Day Parade",
  description: "Contact the Chicago St. Patrick's Day Parade Committee.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative py-32 px-4 hero-gradient text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Mail className="w-16 h-16 text-gold-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-4 text-shadow">
            Contact Us
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto">
            Have a question? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-emerald-100">
                <Mail className="w-6 h-6 text-emerald-700 mb-3" />
                <h3 className="font-bold text-charcoal mb-1">Email</h3>
                <a href="mailto:parade@chicagostpatricksdayparade.com" className="text-emerald-700 hover:text-emerald-600 text-sm transition-colors">
                  parade@chicagostpatricksdayparade.com
                </a>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-emerald-100">
                <MapPin className="w-6 h-6 text-emerald-700 mb-3" />
                <h3 className="font-bold text-charcoal mb-1">Parade Location</h3>
                <p className="text-charcoal/60 text-sm">
                  Columbus Drive<br />Chicago, IL 60601
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Clover className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-charcoal font-heading">Send Us a Message</h2>
                </div>
                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">First Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1.5">Last Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream" placeholder="O'Brien" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream" placeholder="(312) 555-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">Subject</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream">
                      <option>General Inquiry</option>
                      <option>Sponsorship Packages</option>
                      <option>Parade Entry</option>
                      <option>Grandstand Seats</option>
                      <option>CBC Dinner</option>
                      <option>Queen Contest</option>
                      <option>Raffle Tickets</option>
                      <option>Ad Book</option>
                      <option>Media / Press</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">Message</label>
                    <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-charcoal bg-cream resize-none" placeholder="How can we help you?" />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-full transition-all text-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
