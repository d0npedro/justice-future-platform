import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { SkipLink } from "@/components/ui/SkipLink";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL("https://justice-future-platform.vercel.app");

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: "Justice Future Platform",
  description:
    "A structured digital layer for conflict resolution before escalation. Building the missing infrastructure between conflict and formal proceedings.",
  openGraph: {
    title: "Justice Future Platform",
    description:
      "A structured digital layer for conflict resolution before escalation.",
    type: "website",
    url: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
