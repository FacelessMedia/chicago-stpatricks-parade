"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Menu, X, Clover, ChevronRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/parade-info", label: "Parade Info" },
  {
    label: "Events & Tickets",
    children: [
      { href: "/events", label: "All Events" },
      { href: "/packages", label: "Sponsorship Packages" },
      { href: "/queen-contest", label: "Queen Contest" },
    ],
  },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const DESKTOP_NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/parade-info", label: "Parade Info" },
  { href: "/packages", label: "Packages" },
  { href: "/events", label: "Events" },
  { href: "/queen-contest", label: "Queen Contest" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [submenu, setSubmenu] = useState<string | null>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setSubmenu(null);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activeSubmenuItems = MOBILE_NAV.find(
    (item) => "children" in item && item.label === submenu
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-emerald-950/95 backdrop-blur-md border-b border-emerald-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-3 group">
            <Clover className="w-7 h-7 sm:w-8 sm:h-8 text-gold-500 group-hover:rotate-12 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="text-white font-bold text-base sm:text-lg leading-tight tracking-wide">
                CHICAGO
              </span>
              <span className="text-gold-400 text-[10px] sm:text-xs tracking-[0.2em] uppercase">
                St. Patrick&apos;s Day Parade
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {DESKTOP_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-emerald-100 hover:text-gold-400 transition-colors duration-200 rounded-md hover:bg-emerald-900/50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="px-3 py-2 text-sm text-emerald-300/70 hover:text-gold-400 transition-colors duration-200 rounded-md hover:bg-emerald-900/50"
            >
              Participate
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => {
              if (isOpen) {
                closeMenu();
              } else {
                setIsOpen(true);
              }
            }}
            className="lg:hidden p-2 text-emerald-100 hover:text-gold-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-16 sm:top-20 bg-emerald-950 z-40 transition-all duration-300 ease-in-out",
          isOpen
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <div className="h-full overflow-y-auto overscroll-contain">
          {/* Main Menu */}
          <div
            className={cn(
              "absolute inset-0 px-6 pt-6 pb-24 transition-all duration-300",
              submenu ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
            )}
          >
            <div className="space-y-1">
              {MOBILE_NAV.map((item) =>
                "children" in item ? (
                  <button
                    key={item.label}
                    onClick={() => setSubmenu(item.label)}
                    className="w-full flex items-center justify-between px-4 py-4 text-lg text-emerald-100 hover:text-gold-400 hover:bg-emerald-900/50 rounded-xl transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-emerald-400" />
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="block px-4 py-4 text-lg text-emerald-100 hover:text-gold-400 hover:bg-emerald-900/50 rounded-xl transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-emerald-800/50">
              <Link
                href="/register"
                onClick={closeMenu}
                className="block px-4 py-4 text-emerald-400/70 hover:text-gold-400 hover:bg-emerald-900/50 rounded-xl transition-colors text-sm"
              >
                Participate / Register
              </Link>
            </div>

            <div className="mt-8 px-4 text-emerald-600 text-xs">
              <p>parade@chicagostpatricksdayparade.com</p>
            </div>
          </div>

          {/* Submenu Panel */}
          <div
            className={cn(
              "absolute inset-0 px-6 pt-6 pb-24 transition-all duration-300",
              submenu ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            )}
          >
            <button
              onClick={() => setSubmenu(null)}
              className="flex items-center gap-2 px-4 py-3 text-gold-400 hover:text-gold-300 mb-4 -ml-1 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Back</span>
            </button>

            <h3 className="px-4 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              {submenu}
            </h3>

            <div className="space-y-1">
              {activeSubmenuItems &&
                "children" in activeSubmenuItems &&
                activeSubmenuItems.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={closeMenu}
                    className="block px-4 py-4 text-lg text-emerald-100 hover:text-gold-400 hover:bg-emerald-900/50 rounded-xl transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
