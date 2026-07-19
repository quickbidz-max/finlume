import { Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ContactCardProps {
  email: string;
}

export default function ContactCard({ email }: ContactCardProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-6">
      <Link
        href={`mailto:${email}`}
        className="group flex flex-col p-6 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-850 dark:bg-zinc-900/40 dark:hover:border-zinc-750 transition-all duration-300 shadow-2xs hover:shadow-xs"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-150 text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 mb-4 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900 transition-colors duration-300">
          <Mail className="h-5 w-5" />
        </div>
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
          Email Support
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
          Get in touch with our security compliance team.
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-zinc-900 hover:text-zinc-950 dark:text-zinc-100 dark:hover:text-white group-hover:underline mt-auto">
          {email}
          <ExternalLink className="h-3 w-3 opacity-60" />
        </span>
      </Link>
    </div>
  );
}
