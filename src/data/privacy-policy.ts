export interface PolicyCard {
  title: string;
  description: string;
  iconName: string;
  tag?: string;
}

export interface PolicySubsection {
  title: string;
  description?: string;
  items?: string[];
}

export interface PolicySection {
  id: string;
  title: string;
  iconName: string;
  intro?: string;
  paragraphs?: string[];
  subsections?: PolicySubsection[];
  cards?: PolicyCard[];
  notice?: string;
  contactDetails?: {
    email: string;
  };
}

export const PRIVACY_METADATA = {
  lastUpdated: "July 19, 2026",
  effectiveDate: "July 19, 2026",
  emailSupport: "support@moneyutility.com",
  termsUrl: "/terms-conditions",
  contactUrl: "/contact",
};

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    id: "introduction",
    title: "Introduction",
    iconName: "FileText",
    paragraphs: [
      'Welcome to Finlume ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and share your information when you use the Finlume mobile application (the "App").',
      'Please read this policy carefully. By accessing or using the App, you agree to the collection and use of your information in accordance with this Privacy Policy.'
    ]
  },
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    iconName: "Database",
    subsections: [
      {
        title: "A. Information You Provide to Us",
        items: [
          "Account Registration Information: When you register for an account, we collect your email address, password, and first and last name (optional metadata) to establish your secure user account.",
          "Financial Profile Customization: We collect preferences such as your default currency settings and automatic salary configurations.",
          "Financial Records & Logs: We store financial records you manually input, including income transactions, expense transactions, transaction dates, categories, budget limits, savings goals, recurring subscription schedules, and debt entries.",
          "Social Split-Bill Information: When creating shared bill structures, we record group member identifiers (or custom names/nicknames if they do not have accounts) and specific bill amounts/paid statuses.",
          "Visual Card Customization: To render visual representations of your payment cards in the wallet interface, we collect names or nicknames you assign to your cards. We do not collect, request, or store your actual credit/debit card numbers, CVVs, expiration dates, or bank login credentials."
        ]
      },
      {
        title: "B. Device and Upload Data",
        items: [
          "Receipt Images & Camera Access: If you opt to use the receipt scanner feature, we request permission to access your device’s camera and image gallery. These images are parsed locally on your device (see Section 3 on OCR Processing) and are not uploaded to our external servers."
        ]
      },
      {
        title: "C. Automatically Collected Usage Metrics",
        items: [
          "Performance Diagnostics & Crash Logs: We collect performance metrics and error logs via integration tracking libraries (such as Sentry) to fix software errors.",
          "Anonymized Product Analytics: We utilize analytics services (such as Vexo Analytics) to track pages visited, interaction durations, and features utilized to optimize application layouts."
        ]
      }
    ]
  },
  {
    id: "how-we-use-information",
    title: "2. How We Use Your Information",
    iconName: "Settings",
    intro: "We process your data for the following legitimate business purposes:",
    cards: [
      {
        title: "Core Functionality",
        description: "To display cash flow summaries, compute total balance aggregates, calculate month-over-month (MoM) income insights, and render victory charts.",
        iconName: "Wallet"
      },
      {
        title: "Data Synchronization",
        description: "To store and sync your account metadata, budgets, transactions, savings goals, and bill divisions across your logged-in devices.",
        iconName: "RefreshCw"
      },
      {
        title: "Local Notifications",
        description: "To issue alerts when category expenditures approach 80% or 100% of defined budgets, or when bills are settled.",
        iconName: "Bell"
      },
      {
        title: "Social Splits & Out-of-App Sharing",
        description: "To track settlement statuses within split groups and export shareable split-bill text summaries for communication channels.",
        iconName: "Users"
      },
      {
        title: "Gamification Mechanics",
        description: "To calculate saving streaks, assign badge tiers, and manage the virtual rewards system.",
        iconName: "Award"
      }
    ]
  },
  {
    id: "data-processing-security",
    title: "3. Data Processing and Security Details",
    iconName: "ShieldCheck",
    subsections: [
      {
        title: "A. Local On-Device OCR Processing (Privacy Highlight)",
        description: "When utilizing the Optical Character Recognition (OCR) receipt scanner, all document parsing is performed entirely on-device using Google ML Kit (on Android devices) and Apple Vision (on iOS devices) via local package processing libraries (expo-mlkit-ocr).",
        items: [
          "Receipt images, text blocks, and parsed values are calculated locally.",
          "Images of your receipts are never transmitted to, or stored on, our databases or third-party servers."
        ]
      },
      {
        title: "B. Supabase Cloud Hosting and Storage",
        description: "Your encrypted authentication data and application tables are securely hosted and synchronized in Supabase PostgreSQL cloud instances. All data transmissions are protected via TLS 1.2+ protocols, and stored data is encrypted at rest using standard encryption practices (AES-256)."
      },
      {
        title: "C. No Financial Credentials Stored",
        description: "Finlume does not integrate with raw bank login APIs or store bank account details directly. If third-party bank-linking systems (such as Plaid or Account Aggregator frameworks) are enabled in future releases, all interactions will be facilitated via secure tokenized protocols, ensuring Finlume never accesses or holds your raw financial credentials."
      }
    ]
  },
  {
    id: "third-party-services",
    title: "4. Third-Party Service Providers",
    iconName: "Link2",
    intro: "We utilize trusted third-party SDKs and service providers to manage auth, storage, and diagnostics:",
    subsections: [
      {
        title: "Supabase",
        description: "Backend database hosting, API gateway management, and user authentication infrastructure."
      },
      {
        title: "Sentry / Vexo Analytics",
        description: "Diagnostics, error telemetry, and interaction metrics."
      },
      {
        title: "Exchange Rate APIs",
        description: "Synchronizes current conversion coefficients to enable multi-currency representation. (These lookup queries do not transmit any personal user identifiers)."
      }
    ]
  },
  {
    id: "choices-and-rights",
    title: "5. Your Choices, Controls, and Privacy Rights",
    iconName: "UserCheck",
    intro: "We recognize your rights over your personal financial data under global regulations (such as GDPR in Europe and the DPDP Act in India):",
    subsections: [
      {
        title: "Access and Portability",
        description: "You can view and edit your profile parameters, transactions, and settings inside the App."
      },
      {
        title: "Database Reset",
        description: "You can clear all transactions, budgets, savings goals, and history logs from your account via the Profile Settings panel."
      },
      {
        title: "Permanent Account Erasure",
        description: "You can permanently delete your user profile and all associated data records via the \"Delete Account\" function in the Profile settings menu. This action permanently deletes your record from our Supabase authentication records and relational databases, with no backup retention."
      },
      {
        title: "Revoking Permissions",
        description: "You can revoke access to your device's camera, gallery, and local notifications at any time through your OS settings."
      }
    ]
  },
  {
    id: "children-privacy",
    title: "6. Children's Privacy",
    iconName: "Baby",
    paragraphs: [
      "The App is designed for personal and professional budgeting, and is not intended for use by children under the age of 18. We do not knowingly collect personal data from minors. If you discover a minor has registered an account with us, please contact support to have the profile removed."
    ]
  },
  {
    id: "policy-updates",
    title: "7. Updates to This Privacy Policy",
    iconName: "RefreshCw",
    paragraphs: [
      'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy in the App and updating the "Effective Date" at the top of this document.'
    ]
  },
  {
    id: "contact-us",
    title: "8. Contact Us",
    iconName: "Mail",
    paragraphs: [
      "If you have any questions, compliance inquiries, or concerns regarding your data or this Privacy Policy, please contact our support team at:"
    ],
    contactDetails: {
      email: PRIVACY_METADATA.emailSupport
    }
  }
];
