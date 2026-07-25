import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

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
                <a href="mailto:parade@chicagostpatricksdayparade.org" className="text-emerald-700 hover:text-emerald-600 text-sm transition-colors">
                  parade@chicagostpatricksdayparade.org
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
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
