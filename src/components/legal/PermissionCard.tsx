import LegalIcon from "./LegalIcon";

interface PermissionCardProps {
  title: string;
  description: string;
  iconName: string;
}

export default function PermissionCard({ title, description, iconName }: PermissionCardProps) {
  return (
    <div className="flex gap-4 p-5 rounded-2xl border border-zinc-200 bg-white shadow-xs transition-all duration-300 hover:shadow-md hover:border-zinc-300 dark:border-zinc-850 dark:bg-zinc-900/40 dark:hover:border-zinc-750">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-150 text-zinc-700 dark:bg-zinc-800/80 dark:border-zinc-700/50 dark:text-zinc-300">
        <LegalIcon name={iconName} className="h-5 w-5" />
      </div>
      <div>
        <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
          {title}
        </h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
