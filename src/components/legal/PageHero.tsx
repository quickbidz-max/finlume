"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, FileText } from "lucide-react";
import Link from "next/link";
import { PRIVACY_METADATA } from "@/data/privacy-policy";

export default function PageHero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/20">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_20rem_at_top,theme(colors.zinc.100),transparent)] dark:bg-[radial-gradient(45rem_20rem_at_top,theme(colors.zinc.900/0.4),transparent)]" />
      <div className="absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-zinc-200/40 blur-3xl dark:bg-zinc-800/20" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 shadow-sm w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Finlume Legal Center
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Privacy Policy
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            Your privacy matters to us. Learn how Finlume collects, stores, uses, and protects your financial and personal information.
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            <div>
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Last Updated:</span> {PRIVACY_METADATA.lastUpdated}
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div>
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Effective Date:</span> {PRIVACY_METADATA.effectiveDate}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <Link
              href={`mailto:${PRIVACY_METADATA.emailSupport}`}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-zinc-900 text-white font-medium text-sm transition-all hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus:ring-zinc-300 dark:focus:ring-offset-zinc-900 shadow-sm"
            >
              <Mail className="w-4 h-4" />
              Contact Support
            </Link>
            <Link
              href={PRIVACY_METADATA.termsUrl}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg border border-zinc-200/80 bg-white text-zinc-700 font-medium text-sm transition-all hover:bg-zinc-50 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white dark:focus:ring-zinc-300 shadow-sm"
            >
              <FileText className="w-4 h-4" />
              Terms & Conditions
              <ArrowRight className="w-4 h-4 ml-0.5 opacity-60" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
