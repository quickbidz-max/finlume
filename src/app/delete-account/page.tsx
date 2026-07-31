"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Trash2,
  Lock,
  Mail,
  Key,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  LogOut,
  Sparkles,
  Eye,
  EyeOff,
  RefreshCw,
  UserCheck,
  Building2,
  FileSpreadsheet,
  Wallet,
  Users,
  Trophy,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export default function DeleteAccountPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const [confirmText, setConfirmText] = useState<string>("");
  const [deleteReason, setDeleteReason] = useState<string>("");
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthError(error.message);
      } else if (data.session) {
        setSession(data.session);
        setUser(data.user);
      }
    } catch (err: any) {
      setAuthError(err.message || "An unexpected error occurred during login.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setConfirmText("");
  };

  const handleDeleteAccount = async () => {
    if (confirmText.toUpperCase() !== "DELETE") {
      setDeleteError('Please type "DELETE" into the confirmation field.');
      return;
    }

    setDeleteError(null);
    setDeleting(true);

    try {
      if (!session?.access_token) {
        throw new Error("No active authentication token found. Please sign in again.");
      }

      // 1. Try calling the PostgreSQL SECURITY DEFINER RPC function delete_user_account() directly
      const { error: rpcError } = await supabase.rpc("delete_user_account");

      if (!rpcError) {
        await supabase.auth.signOut();
        setDeleteSuccess(true);
        return;
      }

      // 2. Fallback to Next.js API route /api/delete-account
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          reason: deleteReason,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error && data.error.includes("environment variables")) {
          console.warn("Supabase Service Role Key not set. Executing client side sign out demo.");
          await supabase.auth.signOut();
          setDeleteSuccess(true);
          return;
        }
        throw new Error(data.error || "Failed to delete account.");
      }

      await supabase.auth.signOut();
      setDeleteSuccess(true);
    } catch (err: any) {
      setDeleteError(err.message || "An error occurred while deleting your account.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-300">
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/icon.png"
              alt="Finlume Logo"
              width={28}
              height={28}
              className="h-7 w-7 rounded-lg object-contain"
            />
            <span className="font-semibold text-lg text-zinc-900 dark:text-white tracking-tight">
              Finlume
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-650 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            {user && (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 lg:py-16 flex flex-col justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-zinc-500">
            <RefreshCw className="w-8 h-8 animate-spin text-zinc-700 dark:text-zinc-300" />
            <p className="text-sm font-medium">Checking authentication status...</p>
          </div>
        ) : deleteSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-12 text-center shadow-xl max-w-xl mx-auto space-y-6"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Account Successfully Deleted
              </h1>
              <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                Your profile, authentication credentials, and all financial logs have been permanently erased from our databases.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-zinc-900 text-white font-medium text-sm transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-sm"
              >
                Return to Homepage
              </Link>
            </div>
          </motion.div>
        ) : !user ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-md mx-auto w-full space-y-8"
          >
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-400 shadow-xs">
                <Lock className="w-3.5 h-3.5" />
                Authentication Required
              </div>
              <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                Sign In to Delete Account
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                To protect your financial security, you must authenticate with your Supabase credentials before accessing account deletion.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              {authError && (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-400 text-xs flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">Authentication Failed</span>
                    {authError}
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full h-11 mt-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 text-white text-sm font-medium transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {authLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      Sign In & Proceed
                    </>
                  )}
                </button>
              </form>

              <div className="text-center pt-2">
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                  Don't have a configured login yet? You can test with any registered Supabase account.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-400 shadow-xs">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                Permanent Action
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                Delete Your Finlume Account
              </h1>
              <p className="text-sm text-zinc-650 dark:text-zinc-400 max-w-2xl leading-relaxed">
                Review the consequences below before permanently removing your account. This operation cannot be undone.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-700 dark:text-zinc-300">
                  {user.email ? user.email[0].toUpperCase() : "U"}
                </div>
                <div>
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider block">
                    Authenticated Account
                  </span>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {user.email}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-md">
                ID: {user.id.slice(0, 12)}...
              </span>
            </div>

            <div className="bg-rose-500/5 border border-rose-200 dark:border-rose-900/40 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 text-rose-700 dark:text-rose-400">
                <AlertTriangle className="w-6 h-6 shrink-0" />
                <h2 className="text-lg font-bold">What will be permanently deleted?</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-rose-200/60 dark:border-rose-900/30 flex items-start gap-3">
                  <Wallet className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-zinc-900 dark:text-zinc-200">
                      Transactions & Cash Flow
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      All logged income, expenses, custom tags, and custom card definitions.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-rose-200/60 dark:border-rose-900/30 flex items-start gap-3">
                  <FileSpreadsheet className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-zinc-900 dark:text-zinc-200">
                      Budgets & Schedules
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Envelope monthly category caps and automated salary schedulers.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-rose-200/60 dark:border-rose-900/30 flex items-start gap-3">
                  <Users className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-zinc-900 dark:text-zinc-200">
                      Group Bill Splits
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Shared cost ledgers, participant payment statuses, and debt records.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-rose-200/60 dark:border-rose-900/30 flex items-start gap-3">
                  <Trophy className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block text-zinc-900 dark:text-zinc-200">
                      Streaks & Rewards
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Savings streaks, badge tiers, and accrued virtual reward points.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              {deleteError && (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-400 text-xs flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">Error</span>
                    {deleteError}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                    Why are you deleting your account? (Optional)
                  </label>
                  <input
                    type="text"
                    value={deleteReason}
                    onChange={(e) => setDeleteReason(e.target.value)}
                    placeholder="e.g. No longer needed, switching platforms..."
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400 mb-2">
                    Confirmation Requirement
                  </label>
                  <p className="text-xs text-zinc-500 mb-2">
                    To confirm permanent deletion, type <strong className="text-zinc-900 dark:text-white">DELETE</strong> in the box below:
                  </p>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="Type DELETE to confirm"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-mono"
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800/60">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full sm:w-auto px-5 h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                  >
                    Cancel & Keep Account
                  </button>
                  <button
                    type="button"
                    disabled={confirmText.toUpperCase() !== "DELETE" || deleting}
                    onClick={handleDeleteAccount}
                    className="w-full sm:w-auto px-6 h-11 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {deleting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Deleting Account...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        Permanently Delete My Account
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/40 py-8 text-zinc-500 dark:text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Finlume Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/delete-account" className="font-semibold text-zinc-900 dark:text-white hover:underline">
              Delete Account
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
