"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center hero-gradient text-white text-center overflow-hidden px-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto">
        <AlertTriangle className="w-16 h-16 text-gold-400 mx-auto mb-6" />
        <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-6 text-shadow">
          Something Went Wrong
        </h1>
        <p className="text-emerald-200 text-lg mb-10">
          An unexpected error occurred. Please try again — if the problem persists,
          reach out to us and we&apos;ll get it sorted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold rounded-full transition-all"
          >
            <RefreshCw className="w-5 h-5" /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 hover:bg-white/10 text-white font-semibold rounded-full transition-all"
          >
            <Home className="w-5 h-5" /> Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
