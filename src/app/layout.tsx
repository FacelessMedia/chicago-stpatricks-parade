import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chicagostpatricksdayparade.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Chicago St. Patrick's Day Parade | Official Website",
    template: "%s | Chicago St. Patrick's Day Parade",
  },
  description:
    "One of the nation's largest and most celebrated St. Patrick's Day parades. Join us in downtown Chicago for the annual celebration of Irish heritage, culture, and community.",
  keywords: [
    "Chicago St. Patrick's Day Parade",
    "Chicago river dyeing",
    "St. Patrick's Day Chicago",
    "Columbus Drive parade",
    "Irish heritage Chicago",
  ],
  openGraph: {
    title: "Chicago St. Patrick's Day Parade",
    description:
      "One of the nation's largest St. Patrick's Day parades — celebrating Irish heritage in the heart of Chicago.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Chicago St. Patrick's Day Parade",
    images: [{ url: "/images/parade-logo-2026.jpg", width: 1024, height: 1024, alt: "Chicago St. Patrick's Day Parade" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chicago St. Patrick's Day Parade",
    description:
      "One of the nation's largest St. Patrick's Day parades — celebrating Irish heritage in the heart of Chicago.",
    images: ["/images/parade-logo-2026.jpg"],
  },
  robots: { index: true, follow: true },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Chicago St. Patrick's Day Parade 2027",
  startDate: "2027-03-13T12:00:00-06:00",
  endDate: "2027-03-13T15:00:00-06:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Columbus Drive, Grant Park",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Columbus Drive (Balbo Drive to Monroe Street)",
      addressLocality: "Chicago",
      addressRegion: "IL",
      addressCountry: "US",
    },
  },
  image: [`${SITE_URL}/images/parade-logo-2026.jpg`],
  description:
    "The 72nd annual Chicago St. Patrick's Day Parade — one of the nation's largest celebrations of Irish heritage, preceded by the world-famous dyeing of the Chicago River.",
  organizer: {
    "@type": "Organization",
    name: "Chicago St. Patrick's Day Parade Committee",
    url: SITE_URL,
  },
  isAccessibleForFree: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-cream text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        <Navbar />
        <main className="min-h-screen pt-16 sm:pt-20">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
