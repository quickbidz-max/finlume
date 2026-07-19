"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Wallet,
  Receipt,
  TrendingUp,
  Users,
  Bell,
  ScanLine,
  Globe,
  Target,
  CreditCard,
  Calendar,
  Trophy,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  Mail,
  FileText,
} from "lucide-react";
import Link from "next/link";

interface FeatureSpec {
  id: number;
  title: string;
  tag: "Core" | "Social" | "AI Scanner" | "Gamified" | "Security" | "Utilities";
  icon: any;
  description: string;
  bulletPoints: string[];
}

const features: FeatureSpec[] = [
  {
    id: 1,
    title: "User Onboarding & Authentication",
    tag: "Security",
    icon: Shield,
    description:
      "Secure, robust identity and profile management powered by Supabase Auth.",
    bulletPoints: [
      "Interactive Onboarding: A dynamic introductory carousel showcasing core app value propositions (spending tracking, social splitting, streak milestones).",
      'Secure Authentication: Traditional credentials-based sign-up and sign-in, with standard recovery ("Forgot Password") screens.',
      "Personalized Profile Setup: On initial configuration, users set their default currency preference, display name, and auto-salary attributes.",
      "Granular Data Controls: Database Reset (wipes financial tables) and Account Deletion (permanently deletes from Supabase auth/DB).",
    ],
  },
  {
    id: 2,
    title: "Interactive Wallet & Cash Flow Dashboard",
    tag: "Core",
    icon: Wallet,
    description:
      "The hub of the app, giving users a complete picture of their financial health.",
    bulletPoints: [
      "Visual Card Wallet: Beautifully rendered credit/debit card mockups where users name/nickname cards with custom colors (no real card numbers or bank credentials stored).",
      "Earning vs. Spending Charts: Visual graphs mapping monthly/weekly income against expenses using victory-native to analyze cash flow.",
      "Real-Time Calculation: Dynamic total balance calculations that update automatically as transactions are added or settled.",
      "Savings Streak Indicator: Prominent badge displaying consecutive active days with quick actions to log daily activity.",
    ],
  },
  {
    id: 3,
    title: "Transaction Management (Income & Expense)",
    tag: "Core",
    icon: Receipt,
    description:
      "Enables immediate logging and classification of all cash flows.",
    bulletPoints: [
      "Manual Logging Form: Quick-entry sheet for amount, transaction type (income vs. expense), categories (Food, Shopping, Utilities, Travel), custom tags (Freelance, Gift, Reimbursement), and date/time.",
      "Visual Category Identifiers: Clean icons and styling mapped to transaction categories for visual scannability on the history list.",
    ],
  },
  {
    id: 4,
    title: "Multi-Source Income Tracker",
    tag: "Core",
    icon: TrendingUp,
    description:
      "Tailored for users with diverse or non-traditional income streams (freelancing, side hustles, gig work).",
    bulletPoints: [
      "Categorization: Visual segregation of freelance earnings, standard salary, investments, and side income.",
      "Period Comparisons: Compares MoM and QoQ changes, presenting positive/negative rate adjustments clearly.",
      "Auto-Salary Scheduler: Automated income entry (amount, source, and calendar day) to credit the wallet automatically every month.",
    ],
  },
  {
    id: 5,
    title: "Group Bill Splitting (Social Module)",
    tag: "Social",
    icon: Users,
    description:
      "Makes calculating, splitting, and tracking group expenditures simple and transparent.",
    bulletPoints: [
      "Group Bill Creation: Organize shared costs with a custom title, total bill value, merchant info, and participant list.",
      "Flexible Splitting Models: Equal Split (even division) and Custom Split (manual dollar or percentage allocation per member).",
      "Settle Tracking Ledger: Dashboard displaying participant payment statuses (Paid/Unpaid) that the bill owner can toggle instantly.",
      "External Summary Sharing: Copyable text summary detailing who owes what, ready to share via SMS, WhatsApp, or email.",
    ],
  },
  {
    id: 6,
    title: "Envelope Budgeting & Smart Alerts",
    tag: "Utilities",
    icon: Bell,
    description:
      "Prevents overspending by enforcing limits on visual categories.",
    bulletPoints: [
      "Category Caps: Define customized monthly budgets for individual categories (e.g., eating out limit, transport budget).",
      "Proactive Notification Thresholds: Warning triggered at 80% and 100% (overlimit warning) of defined budgets.",
    ],
  },
  {
    id: 7,
    title: "On-Device Receipt Scanning (OCR)",
    tag: "AI Scanner",
    icon: ScanLine,
    description:
      "Converts paper receipts and invoice images into pre-filled transaction entries.",
    bulletPoints: [
      "Dual Capture Methods: Capture direct photo using camera or pick image from photo gallery.",
      "On-Device OCR Parsing: Locally processed OCR via expo-mlkit-ocr (using Google ML Kit on Android and Apple Vision on iOS).",
      "Automated Parameter Filling: Pre-populates vendor name, date, and invoice total in the logging screen. Zero receipt data leaves the device.",
    ],
  },
  {
    id: 8,
    title: "Multi-Currency Support & Live Conversion",
    tag: "Utilities",
    icon: Globe,
    description: "Global financial calculation capabilities.",
    bulletPoints: [
      "Exchange Rates Syncing: Background services fetch real-time conversion coefficients from exchange rate providers.",
      "Universal Convert Toggles: Change display currency settings to recalculate dashboard cards, balances, and trends automatically.",
    ],
  },
  {
    id: 9,
    title: "Savings Goals Tracker",
    tag: "Core",
    icon: Target,
    description: "Enables dedicated target-based saving strategies.",
    bulletPoints: [
      "Target Creation: Name a goal, set a target amount, and optionally assign a target date.",
      "Progress Visualization: Progress bars showing percentage achieved and remaining amount.",
      "Contribute & Withdraw Log: Add or remove funds directly from savings goals with live adjustments in the dashboard wallet balance.",
    ],
  },
  {
    id: 10,
    title: "Debt & Loan Tracking",
    tag: "Utilities",
    icon: CreditCard,
    description: "Manages active IOUs and balances with external parties.",
    bulletPoints: [
      "Lent vs. Borrowed: Segregate amounts you owe others from amounts owed to you.",
      "Incremental Repayment Logs: Mark partial or complete repayments against outstanding debts with clear audit logs.",
    ],
  },
  {
    id: 11,
    title: "Recurring Bill Scheduler",
    tag: "Utilities",
    icon: Calendar,
    description: "Simplifies recurring transaction logging.",
    bulletPoints: [
      "Schedule Subscriptions: Set recurring logs (weekly, monthly, yearly) for subscriptions like Netflix, rent, or gym memberships.",
      "Automatic Postings: Automatically appends entries when a calendar cycle completes and issues local notifications.",
    ],
  },
  {
    id: 12,
    title: "Savings Streaks & Rewards Shop",
    tag: "Gamified",
    icon: Trophy,
    description:
      "Gamifies financial responsibility to boost daily active retention.",
    bulletPoints: [
      "Activity Streak Tracker: Accumulates consecutive days of financial logging.",
      "Badge Tiers: Level up across tiers based on streak count from Standard (0-2 days) to Gold VIP (30+ days).",
      "Rewards Store: Redeem virtual points earned from logging transactions/streaks for virtual gift vouchers (e.g., claiming free coffee, claiming cashback).",
    ],
  },
];

const tagColors: Record<string, string> = {
  Core: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/50",
  Social:
    "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200/50 dark:border-purple-800/50",
  "AI Scanner":
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/50",
  Gamified:
    "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/50",
  Security:
    "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200/50 dark:border-rose-800/50",
  Utilities:
    "bg-zinc-50 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200/50 dark:border-zinc-700/50",
};

export default function FeatureGuidePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans transition-colors duration-300">
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center font-bold text-sm text-white dark:text-zinc-900 shadow-sm">
              F
            </div>
            <span className="font-semibold text-lg text-zinc-900 dark:text-white tracking-tight">
              Finlume
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium text-zinc-650 hover:text-zinc-900 dark:text-zinc-450 dark:hover:text-white transition-colors"
            >
              Features
            </a>
            <Link
              href="/privacy-policy"
              className="text-sm font-medium text-zinc-650 hover:text-zinc-900 dark:text-zinc-450 dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden py-20 lg:py-28 bg-linear-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(50rem_25rem_at_top,var(--color-zinc-100),transparent)] dark:bg-[radial-gradient(50rem_25rem_at_top,var(--color-zinc-900),transparent)]/30" />
        <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-zinc-200/30 blur-3xl dark:bg-zinc-800/10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-950 dark:text-white" />
              Finlume Feature Guide & Specifications
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]"
            >
              Everything you need to master your personal finance
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-zinc-650 dark:text-zinc-400 leading-relaxed max-w-3xl"
            >
              Detailed breakdown of Finlume v1.0 specifications. Discover our
              built-in modules designed with Expo, Supabase backend databases,
              and modern data encryption standards.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 mt-4"
            >
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-zinc-900 text-white font-medium text-sm transition-all hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus:ring-zinc-350 shadow-sm"
              >
                Browse Spec Modules
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/privacy-policy"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg border border-zinc-200 bg-white text-zinc-700 font-medium text-sm transition-all hover:bg-zinc-50 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white shadow-sm"
              >
                <Shield className="w-4 h-4" />
                Read Privacy Policy
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-zinc-100/50 dark:bg-zinc-900/30 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest text-center">
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4" /> React Native & Expo
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden sm:inline" />
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" /> Supabase Database & Auth
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden sm:inline" />
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Local On-Device OCR
            </span>
          </div>
        </div>
      </section>

      <main
        id="features"
        className="max-w-7xl mx-auto w-full px-6 py-16 lg:py-24 flex-1"
      >
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            Application Modules & Specs
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Finlume is packed with features that keep your personal budget
            accurate, private, and social when needed.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col p-6 sm:p-8 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-850 dark:bg-zinc-900/40 dark:hover:border-zinc-750 transition-all duration-300 shadow-2xs hover:shadow-xs"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-150 text-zinc-700 dark:bg-zinc-850 dark:border-zinc-750 dark:text-zinc-300 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-950 transition-all duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      tagColors[feat.tag]
                    }`}
                  >
                    {feat.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                  {feat.id}. {feat.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                  {feat.description}
                </p>

                <ul className="space-y-3 mt-auto border-t border-zinc-100 dark:border-zinc-800/80 pt-5">
                  {feat.bulletPoints.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-zinc-650 dark:text-zinc-400"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-zinc-400 dark:text-zinc-600" />
                      <span className="leading-normal">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
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
              <p className="text-xs text-zinc-550 dark:text-zinc-500 max-w-[200px] leading-relaxed">
                Smart financial tracking, budgeting, and automated rewards.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-3">
                Product
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#features"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Privacy Policy
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
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors font-medium hover:underline"
                  >
                    Privacy Policy
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
                    href={`mailto:support@finlume.com`}
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Contact Support
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
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
