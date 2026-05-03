import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maldivesnavigator.com"),
  title: {
    default:
      "Maldives Navigator — A living journal of the 1,192 islands",
    template: "%s — Maldives Navigator",
  },
  description:
    "An independent editorial guide to the Maldives. From $30/night guesthouses to private islands. ",
  openGraph: {
    siteName: "Maldives Navigator",
    title: "Maldives Navigator",
    description:
      "An independent editorial guide to the Maldives. From $30/night guesthouses to private islands. ",
    type: "website",
    locale: "en_US",
    url: "https://maldivesnavigator.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maldives Navigator",
    description:
      "An independent editorial guide to the Maldives. ",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
