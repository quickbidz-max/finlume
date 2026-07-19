import { Metadata } from "next";
import Link from "next/link";
import { PRIVACY_SECTIONS } from "@/data/privacy-policy";
import PageHero from "@/components/legal/PageHero";
import TableOfContents from "@/components/legal/TableOfContents";
import PrivacySection from "@/components/legal/PrivacySection";

export const metadata: Metadata = {
  title: "Privacy Policy | Finlume",
  description:
    "Learn how Finlume collects, protects, stores, and processes your personal and financial information.",
  keywords: [
    "privacy policy",
    "personal finance",
    "bill splitting",
    "expense tracker",
    "income tracker",
    "financial security",
    "data protection",
    "finlume compliance",
  ],
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
  alternates: {
    canonical: "https://finlume.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Finlume",
    description:
      "Learn how Finlume collects, protects, stores, and processes your personal and financial information.",
    url: "https://finlume.com/privacy-policy",
    siteName: "Finlume",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://finlume.com/og-privacy.png",
        width: 1200,
        height: 630,
        alt: "Finlume Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Finlume",
    description:
      "Learn how Finlume collects, protects, stores, and processes your personal and financial information.",
    images: ["https://finlume.com/og-privacy.png"],
  },
};

export default function PrivacyPolicyPage() {
  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://finlume.com/privacy-policy/#webpage",
      url: "https://finlume.com/privacy-policy",
      name: "Privacy Policy | Finlume",
      description:
        "Learn how Finlume collects, protects, stores, and processes your personal and financial information.",
      publisher: {
        "@type": "Organization",
        name: "Finlume",
        logo: {
          "@type": "ImageObject",
          url: "https://finlume.com/logo.png",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://finlume.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Privacy Policy",
          item: "https://finlume.com/privacy-policy",
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 rounded-md dark:focus:ring-zinc-300 dark:focus:ring-offset-zinc-900"
          >
            <div className="h-7 w-7 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center font-bold text-sm text-white dark:text-zinc-900 shadow-sm">
              F
            </div>
            <span className="font-semibold text-lg text-zinc-900 dark:text-white tracking-tight">
              Finlume
            </span>
          </Link>
        </div>
      </header>

      <PageHero />

      <main
        id="main-content"
        className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 lg:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-16 items-start">
          <aside className="lg:sticky lg:top-24 max-h-[calc(100vh-8rem)]">
            <TableOfContents />
          </aside>

          <div className="space-y-6 max-w-4xl">
            {PRIVACY_SECTIONS.map((section) => (
              <PrivacySection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/40 py-12 text-zinc-500 dark:text-zinc-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link
                href="/"
                className="flex items-center gap-2 mb-4 font-semibold text-zinc-900 dark:text-white"
              >
                <div className="h-6 w-6 rounded bg-zinc-900 dark:bg-white flex items-center justify-center font-bold text-xs text-white dark:text-zinc-900">
                  F
                </div>
                Finlume
              </Link>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 max-w-[200px] leading-relaxed">
                Smart financial tracking, budgeting, and automated rewards.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-3">
                Product
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    href="/#features"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#pricing"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-3">
                Legal
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-zinc-900 dark:text-white font-medium hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-conditions"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Cookie Settings
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-3">
                Company
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-200/60 dark:border-zinc-800/60 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <p>
              © {new Date().getFullYear()} Finlume Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy-policy"
                className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/trust"
                className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
              >
                Trust & Safety
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
