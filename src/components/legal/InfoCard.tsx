import { Check } from "lucide-react";

interface InfoCardProps {
  title: string;
  description?: string;
  items?: string[];
}

export default function InfoCard({ title, description, items }: InfoCardProps) {
  return (
    <div className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-zinc-300 dark:border-zinc-850 dark:bg-zinc-900/40 dark:hover:border-zinc-750 dark:hover:bg-zinc-900/60">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors duration-200">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
          {description}
        </p>
      )}
      {items && items.length > 0 && (
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-650 dark:text-zinc-350">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
              <span className="leading-tight">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
