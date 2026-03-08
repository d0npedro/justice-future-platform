import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Justice Future Platform",
  description:
    "A structured digital layer for conflict resolution before escalation. Building the missing infrastructure between conflict and formal proceedings.",
  openGraph: {
    title: "Justice Future Platform",
    description:
      "A structured digital layer for conflict resolution before escalation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
