import Link from "next/link";
import { CalendarClock, ArrowRight } from "lucide-react";
import { getSalesOpenLabel } from "@/lib/season";

interface SalesClosedCardProps {
  title: string;
}

export function SalesClosedCard({ title }: SalesClosedCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-xl h-fit text-center">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CalendarClock className="w-8 h-8 text-emerald-600" />
      </div>
      <h3 className="text-2xl font-bold text-charcoal font-heading mb-3">
        {title} Open in {getSalesOpenLabel()}
      </h3>
      <p className="text-charcoal/60 mb-6">
        Sales for next year&apos;s parade season aren&apos;t open yet. Check back in the fall —
        or reach out and we&apos;ll make sure you&apos;re the first to know.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-full transition-all"
      >
        Get Notified <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
