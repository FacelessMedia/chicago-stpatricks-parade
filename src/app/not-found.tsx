import Link from "next/link";
import { Clover, ArrowRight, Home } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center hero-gradient text-white text-center overflow-hidden px-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-emerald-400 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto">
        <Clover className="w-16 h-16 text-gold-400 mx-auto mb-6" />
        <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-4">404 — Page Not Found</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-6 text-shadow">
          You&apos;ve Marched Off the Route
        </h1>
        <p className="text-emerald-200 text-lg mb-10">
          The page you&apos;re looking for doesn&apos;t exist — it may have moved when we rebuilt the site.
          Let&apos;s get you back to the celebration.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold rounded-full transition-all"
          >
            <Home className="w-5 h-5" /> Back to Home
          </Link>
          <Link
            href="/parade-info"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 hover:bg-white/10 text-white font-semibold rounded-full transition-all"
          >
            Parade Info <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
