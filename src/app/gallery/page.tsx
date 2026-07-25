import Link from "next/link";
import { Camera, ArrowRight, Upload } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { GalleryGrid } from "@/components/GalleryGrid";

export const metadata = {
  title: "Gallery | Chicago St. Patrick's Day Parade",
  description: "Photos from the Chicago St. Patrick's Day Parade through the years.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="relative py-32 px-4 hero-gradient text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Camera className="w-16 h-16 text-gold-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-4 text-shadow">
            Photo Gallery
          </h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto">
            Capturing the magic of Chicago&apos;s St. Patrick&apos;s Day celebrations
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Moments Through the Years"
            subtitle="The green river, the queens, the marchers, and the community that makes it all possible"
          />

          <GalleryGrid />

          {/* Submit Photos */}
          <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 border border-emerald-100 text-center">
            <Upload className="w-12 h-12 text-emerald-700 mx-auto mb-4" />
            <h2 className="text-2xl font-bold font-heading text-charcoal mb-3">
              Have Photos to Share?
            </h2>
            <p className="text-charcoal/60 max-w-xl mx-auto mb-6">
              We&apos;d love to include your photos from past parades in our gallery.
              If you have high-quality photos from any year&apos;s parade, river dyeing,
              CBC dinner, or Queen Contest, please reach out to us.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-full transition-all"
            >
              Submit Your Photos <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
