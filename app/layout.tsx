import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#12100e" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Launching Soon`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "The Better Agency", url: "https://thebetteragency.in" }],
  creator: "The Better Agency",
  publisher: SITE_NAME,
  category: "education",
  keywords: [
    "The Better Academy",
    "advertising academy",
    "creative academy India",
    "Thrissur",
    "The Better Agency",
    "founding cohort 2026",
    "filmmaking",
    "branding",
    "storytelling",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${SITE_NAME} | Launching Soon`,
    description: `${SITE_TAGLINE} ${SITE_DESCRIPTION}`,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Launching Soon`,
    description: `${SITE_TAGLINE} ${SITE_DESCRIPTION}`,
    images: [
      {
        url: "/og-image.jpg",
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
      },
    ],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  other: {
    "geo.region": "IN-KL",
    "geo.placename": "Thrissur",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-dvh bg-cream font-body text-ink antialiased selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
