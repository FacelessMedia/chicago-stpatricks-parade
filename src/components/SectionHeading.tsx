import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({ title, subtitle, centered = true, light = false, className }: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", "mb-12", className)}>
      <h2 className={cn(
        "text-3xl sm:text-4xl md:text-5xl font-bold font-heading tracking-tight",
        light ? "text-white" : "text-charcoal"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-4 text-lg max-w-2xl",
          centered && "mx-auto",
          light ? "text-emerald-200" : "text-charcoal/60"
        )}>
          {subtitle}
        </p>
      )}
      <div className={cn(
        "mt-6 h-1 w-20 rounded-full bg-gold-500",
        centered && "mx-auto"
      )} />
    </div>
  );
}
