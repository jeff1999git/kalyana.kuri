import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CheersCursor } from "@/components/animations/CheersCursor";
import { ClickBurst } from "@/components/animations/ClickBurst";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kalyana.kuri | Digital Wedding Invitations & Event Experiences",
  description:
    "Beautiful digital wedding invitations and interactive experiences for weddings, celebrations and special moments.",
  keywords: [
    "digital wedding invitation",
    "wedding invitation website",
    "digital invitation",
    "RSVP",
    "wedding website Kerala",
  ],
  openGraph: {
    title: "Kalyana.kuri | Digital Wedding Invitations & Event Experiences",
    description:
      "Beautiful digital wedding invitations and interactive experiences for weddings, celebrations and special moments.",
    siteName: "Kalyana.kuri",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalyana.kuri | Digital Wedding Invitations & Event Experiences",
    description:
      "Beautiful digital wedding invitations and interactive experiences for weddings, celebrations and special moments.",
  },
};

export const viewport: Viewport = {
  themeColor: "#080809",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        data-scroll-container
        className="antialiased"
      >
        {children}
        <CheersCursor />
        <ClickBurst />
      </body>
    </html>
  );
}
