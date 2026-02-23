import Link from "next/link";
import { Check, Crown, Star, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  name: string;
  tier: string;
  priceLabel: string;
  features: string[];
  highlight?: boolean;
}

const tierIcons: Record<string, React.ReactNode> = {
  VIP: <Crown className="w-8 h-8" />,
  Executive: <Star className="w-8 h-8" />,
  Premier: <Award className="w-8 h-8" />,
};

export default function PackageCard({ name, tier, priceLabel, features, highlight }: PackageCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-8 flex flex-col h-full transition-all duration-300 hover:-translate-y-2",
        highlight
          ? "bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white shadow-2xl shadow-emerald-900/30 ring-2 ring-gold-500/50"
          : "bg-white text-charcoal shadow-xl shadow-emerald-900/5 ring-1 ring-emerald-100"
      )}
    >
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold-500 text-emerald-950 text-xs font-bold uppercase tracking-wider rounded-full">
          Most Popular
        </div>
      )}

      <div className={cn("mb-6", highlight ? "text-gold-400" : "text-emerald-700")}>
        {tierIcons[tier]}
      </div>

      <h3 className={cn("text-2xl font-bold mb-2", highlight ? "text-white" : "text-charcoal")}>
        {name}
      </h3>

      <div className={cn("text-lg font-semibold mb-6 pb-6 border-b", highlight ? "text-gold-300 border-emerald-700" : "text-emerald-700 border-emerald-100")}>
        {priceLabel}
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className={cn("w-5 h-5 shrink-0 mt-0.5", highlight ? "text-gold-400" : "text-emerald-600")} />
            <span className={cn("text-sm leading-relaxed", highlight ? "text-emerald-100" : "text-charcoal/70")}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/register"
        className={cn(
          "block text-center py-3 px-6 rounded-full font-semibold transition-all duration-200",
          highlight
            ? "bg-gold-500 hover:bg-gold-400 text-emerald-950 hover:shadow-lg hover:shadow-gold-500/25"
            : "bg-emerald-700 hover:bg-emerald-600 text-white hover:shadow-lg hover:shadow-emerald-700/25"
        )}
      >
        Get Started
      </Link>
    </div>
  );
}
