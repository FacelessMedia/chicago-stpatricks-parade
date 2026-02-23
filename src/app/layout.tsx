import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Chicago St. Patrick's Day Parade | Official Website",
  description:
    "One of the nation's largest and most celebrated St. Patrick's Day parades. Join us in downtown Chicago for the annual celebration of Irish heritage, culture, and community.",
  openGraph: {
    title: "Chicago St. Patrick's Day Parade",
    description: "One of the nation's largest St. Patrick's Day parades — celebrating Irish heritage in the heart of Chicago.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-cream text-charcoal">
        <Navbar />
        <main className="min-h-screen pt-16 sm:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
