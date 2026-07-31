import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://finlume.com"
  ),
  title: {
    default:
      "Finlume — Smart Personal Finance, Expense Tracking & Group Bill Splitting",
    template: "%s | Finlume",
  },
  description:
    "Finlume is an all-in-one personal finance platform featuring real-time cash flow dashboards, income tracking, envelope budgeting, group bill splitting, on-device OCR receipt scanning, and savings streak rewards.",
  keywords: [
    "personal finance",
    "expense tracker",
    "bill splitter",
    "budgeting app",
    "cash flow manager",
    "receipt scanner OCR",
    "savings streak",
    "income manager",
    "finlume",
    "supabase finance",
  ],
  authors: [{ name: "Finlume Inc." }],
  creator: "Finlume Inc.",
  publisher: "Finlume Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.png",
    apple: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title:
      "Finlume — Smart Personal Finance, Expense Tracking & Group Bill Splitting",
    description:
      "Track expenses, split group bills, parse receipt images locally, and build savings habits with Finlume.",
    url: "https://finlume.com",
    siteName: "Finlume",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Finlume Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Finlume — Smart Personal Finance, Expense Tracking & Group Bill Splitting",
    description:
      "Track expenses, split group bills, parse receipt images locally, and build savings habits with Finlume.",
    images: ["/icon.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
