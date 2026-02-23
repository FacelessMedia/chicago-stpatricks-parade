import Link from "next/link";
import { Clover, Facebook, Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Clover className="w-8 h-8 text-gold-500" />
              <div>
                <span className="text-white font-bold text-lg block leading-tight">CHICAGO</span>
                <span className="text-gold-400 text-xs tracking-[0.2em] uppercase">
                  St. Patrick&apos;s Day Parade
                </span>
              </div>
            </Link>
            <p className="text-emerald-300 text-sm leading-relaxed">
              One of the nation&apos;s largest and most celebrated St. Patrick&apos;s Day parades, 
              proudly marching through the heart of downtown Chicago.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://www.facebook.com/chicagostpatsparade/" target="_blank" rel="noopener noreferrer" className="p-2 bg-emerald-900/50 rounded-lg hover:bg-gold-500/20 hover:text-gold-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/stpatsparadechi/" target="_blank" rel="noopener noreferrer" className="p-2 bg-emerald-900/50 rounded-lg hover:bg-gold-500/20 hover:text-gold-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold-400 font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About the Parade" },
                { href: "/parade-info", label: "Parade Info" },
                { href: "/packages", label: "Sponsorship Packages" },
                { href: "/queen-contest", label: "Queen Contest" },
                { href: "/gallery", label: "Photo Gallery" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-emerald-300 hover:text-gold-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3 className="text-gold-400 font-semibold text-sm uppercase tracking-wider mb-4">Annual Events</h3>
            <ul className="space-y-2">
              {[
                { href: "/events", label: "River Dyeing Ceremony" },
                { href: "/events", label: "Corned Beef & Cabbage Dinner" },
                { href: "/queen-contest", label: "Queen Contest" },
                { href: "/parade-info", label: "Parade Day" },
                { href: "/gallery", label: "Photo Gallery" },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-emerald-300 hover:text-gold-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold-400 font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                <span className="text-emerald-300 text-sm">
                  Columbus Drive<br />Chicago, IL
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="mailto:parade@chicagostpatricksdayparade.com" className="text-emerald-300 hover:text-gold-400 text-sm transition-colors">
                  parade@chicagostpatricksdayparade.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-emerald-400 text-xs">
            <p>&copy; {new Date().getFullYear()} Chicago St. Patrick&apos;s Day Parade Committee. All rights reserved.</p>
            <p>Proudly celebrating Irish heritage in the heart of Chicago</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
