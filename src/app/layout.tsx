import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const googleSans = localFont({
  src: "../fonts/google-sans-flex.woff2",
  variable: "--font-google-sans",
  display: "swap",
  weight: "100 900",
});

// Editorial italic accent — used sparingly, one emphasis word per headline,
// never for full sentences or body copy.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Imagine Sites – Free AI Website Builder That Creates and Deploys in Minutes",
  description:
    "Describe your idea and Imagine Computer's AI website builder does the rest. A no-code website builder for sites, landing pages, dashboards, and more. Start free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${googleSans.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
