import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f5f1",
};

export const metadata: Metadata = {
  title: "The Better Academy | Launching Soon",
  description:
    "Something Better Takes Time. A premium advertising academy from The Better Agency — launching soon. First batch 2026, Thrissur, India.",
  metadataBase: new URL("https://tbaa.pages.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Better Academy | Launching Soon",
    description:
      "Something Better Takes Time. A premium advertising academy from The Better Agency — launching soon.",
    url: "https://tbaa.pages.dev",
    siteName: "The Better Academy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Better Academy — Something Better Takes Time.",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Better Academy | Launching Soon",
    description:
      "Something Better Takes Time. A premium advertising academy from The Better Agency — launching soon.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-dvh bg-cream font-body text-ink antialiased selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
