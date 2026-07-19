import * as Icons from "lucide-react";

interface LegalIconProps {
  name: string;
  className?: string;
}

export default function LegalIcon({ name, className }: LegalIconProps) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) {
    return <Icons.HelpCircle className={className} />;
  }
  return <IconComponent className={className} />;
}
