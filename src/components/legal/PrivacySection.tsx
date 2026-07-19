"use client";

import { motion } from "framer-motion";
import { Link as LinkIcon } from "lucide-react";
import { PolicySection } from "@/data/privacy-policy";
import InfoCard from "./InfoCard";
import PermissionCard from "./PermissionCard";
import SecurityCard from "./SecurityCard";
import LegalNotice from "./LegalNotice";
import ContactCard from "./ContactCard";
import LegalIcon from "./LegalIcon";

interface PrivacySectionProps {
  section: PolicySection;
}

export default function PrivacySection({ section }: PrivacySectionProps) {
  const getSectionIcon = () => {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
        <LegalIcon name={section.iconName} className="h-4 w-4" />
      </div>
    );
  };

  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -20% 0px" }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-24 py-10 first:pt-0 last:pb-0 border-b border-zinc-200/60 dark:border-zinc-800/60"
    >
      <div className="flex items-center gap-3 group mb-4">
        {getSectionIcon()}
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          {section.title}
          <a
            href={`#${section.id}`}
            className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-all"
            aria-label={`Link to section ${section.title}`}
          >
            <LinkIcon className="h-4 w-4" />
          </a>
        </h2>
      </div>

      {section.intro && (
        <p className="text-zinc-650 dark:text-zinc-350 text-base leading-relaxed mb-6">
          {section.intro}
        </p>
      )}

      {/* Main Paragraphs */}
      {section.paragraphs && section.paragraphs.length > 0 && (
        <div className="space-y-4 mb-6">
          {section.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>
      )}

      {/* Conditional Sub-lists/Sub-sections (e.g., Info types) */}
      {section.subsections && section.subsections.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 mb-6">
          {section.subsections.map((sub, idx) => (
            <InfoCard
              key={idx}
              title={sub.title}
              description={sub.description}
              items={sub.items}
            />
          ))}
        </div>
      )}

      {/* Conditional Grid Cards (e.g. Device Permissions, How We Use, Security) */}
      {section.cards && section.cards.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          {section.cards.map((card, idx) => {
            // Check context of parent section to render correct visual style
            if (section.id === "security") {
              return (
                <SecurityCard
                  key={idx}
                  title={card.title}
                  description={card.description}
                  iconName={card.iconName}
                />
              );
            }
            // Standard card rendering for device permissions & use-cases
            return (
              <PermissionCard
                key={idx}
                title={card.title}
                description={card.description}
                iconName={card.iconName}
              />
            );
          })}
        </div>
      )}

      {/* Strict Legal Notice Alert Banner */}
      {section.notice && (
        <div className="mb-6">
          <LegalNotice message={section.notice} />
        </div>
      )}

      {/* Contact Grid details */}
      {section.contactDetails && (
        <ContactCard
          email={section.contactDetails.email}
          address={section.contactDetails.address}
        />
      )}
    </motion.section>
  );
}
