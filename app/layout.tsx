import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4, IBM_Plex_Sans, JetBrains_Mono, Caveat, VT323, Anton, Fraunces, Public_Sans, Kalam } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DispatchProvider } from "@/components/dispatch-provider";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Editor's red pen — used once or twice as a proof-mark accent, never as body voice.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

// Real LCD-screen pixel font — scoped to the Nokia phone's screen only.
const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: ["400"],
});

// Tight condensed poster face — the "printed directly on the paper sheet"
// headline moment (desk scenes), not the general display face.
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

// ── Marginalia system — header + homepage first, rest of the site to follow.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// The one handwritten voice — spent on a single correction mark in the
// hero and the hover-underline stroke, nowhere else.
const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Khushi Narang — Product Designer",
    template: "%s — Khushi Narang",
  },
  description:
    "Product designer working across product design, UX research, and design systems. Currently at YourStory, based in Bengaluru.",
  openGraph: {
    title: "Khushi Narang — Product Designer",
    description:
      "Product designer working across product design, UX research, and design systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${sourceSerif.variable} ${plexSans.variable} ${jetbrains.variable} ${caveat.variable} ${vt323.variable} ${anton.variable} ${fraunces.variable} ${publicSans.variable} ${kalam.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-black focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <DispatchProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </DispatchProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
