import { ShieldCheck } from "lucide-react";

interface LegalNoticeProps {
  message: string;
}

export default function LegalNotice({ message }: LegalNoticeProps) {
  return (
    <div className="flex gap-4 p-5 rounded-2xl border border-amber-200/80 bg-amber-50/30 dark:border-amber-900/30 dark:bg-amber-950/10 text-amber-900 dark:text-amber-250/90 shadow-2xs">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100/70 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
        <ShieldCheck className="h-5 w-5" />
      </div>
      <div className="flex-1 text-sm leading-relaxed">
        <span className="font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider text-[10px] block mb-1">
          Strict Security Standard
        </span>
        <p className="text-amber-800 dark:text-amber-200/80 font-medium">
          {message}
        </p>
      </div>
    </div>
  );
}
