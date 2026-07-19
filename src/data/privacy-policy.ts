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
    address: string;
  };
}

export const PRIVACY_METADATA = {
  lastUpdated: "July 19, 2026",
  effectiveDate: "July 19, 2026",
  emailSupport: "support@finlume.com",
  termsUrl: "/terms-conditions",
  contactUrl: "/contact",
  addressPlaceholder: "Finlume Inc., 100 Pine Street, Suite 1250, San Francisco, CA 94111 (Future Office)"
};

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    iconName: "FileText",
    intro: "Welcome to Finlume. We are committed to protecting your personal and financial information. This Privacy Policy explains how we collect, use, store, share, and safeguard your data when you use our platform.",
    paragraphs: [
      "Finlume is a comprehensive personal finance platform designed to help you track expenses, monitor income, split bills with friends or colleagues, manage custom budgets, gain visual insights, and earn rewards for healthy saving habits.",
      "By accessing or using Finlume, you agree to the collection and use of your information in accordance with this Privacy Policy. Your trust is our most valuable asset, and we prioritize security and transparency in everything we build."
    ]
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    iconName: "Database",
    intro: "To provide our services effectively, we collect information that you directly provide, data generated automatically, and information from third-party integrations.",
    subsections: [
      {
        title: "Personal Information",
        description: "Information that identifies you individually, which you provide during registration or profile setup:",
        items: [
          "Full Name and optional display name",
          "Email address (used for secure login and notifications)",
          "Phone number (for account verification)",
          "Profile information (such as avatar or preferred currency)",
          "Authentication details (temporary security tokens)"
        ]
      },
      {
        title: "Financial Information",
        description: "Data directly related to your financial planning and tracking activities on the app:",
        items: [
          "Income details (sources, amounts, frequencies)",
          "Expenses (amounts, merchants, transaction dates)",
          "Transaction categories (e.g., Food, Rent, Utilities)",
          "Bill details (amounts, due dates, split participants, and payment status)",
          "Rewards data (points earned, streaks, progress milestones)"
        ]
      },
      {
        title: "Usage & Technical Information",
        description: "Automatically collected data when you interact with the Finlume application:",
        items: [
          "Device type, model, and operating system version",
          "App version and performance/crash logs",
          "Language preferences and current timezone",
          "IP address and browser User-Agent details",
          "Approximate location (only with your explicit device-level permission)"
        ]
      }
    ]
  },
  {
    id: "authentication",
    title: "3. Authentication & Security Gateways",
    iconName: "KeyRound",
    intro: "We implement advanced authentication procedures to ensure that your financial dashboard remains fully secure and accessible only by you.",
    paragraphs: [
      "Finlume uses Supabase Authentication to manage user sign-in processes. We support passwordless Email Login (Magic Links), Google OAuth Login, and Apple Sign-In.",
      "Sessions are secured using JSON Web Tokens (JWT) stored in secure HTTP-only cookies or device storage. All authentication details are transmitted via encrypted HTTPS layers and stored in hashed formats that are completely unreadable by third parties."
    ]
  },
  {
    id: "how-we-use-information",
    title: "4. How We Use Your Data",
    iconName: "Settings",
    intro: "We process your information to deliver a personalized, secure, and highly efficient personal finance experience. Specifically, your data is used for:",
    cards: [
      {
        title: "Improve & Optimize Services",
        description: "Enhancing application layout, fixing bugs, and customizing the dashboard view based on usage patterns.",
        iconName: "TrendingUp"
      },
      {
        title: "Generate Visual Reports",
        description: "Processing your income and expenses to render dynamic visual charts, monthly breakdowns, and savings progress.",
        iconName: "PieChart"
      },
      {
        title: "Bill Splitting Calculations",
        description: "Computing exact shared amounts among bill participants, tracking who owes whom, and settling bills securely.",
        iconName: "Users"
      },
      {
        title: "Rewards & Streak Milestones",
        description: "Calculating your financial savings streaks and distributing milestone rewards inside the application.",
        iconName: "Award"
      },
      {
        title: "Transactional Notifications",
        description: "Sending critical reminders for upcoming bills, low budgets, savings streaks, and push updates.",
        iconName: "Bell"
      },
      {
        title: "Customer Support & Feedback",
        description: "Resolving user inquiries, processing support requests, and diagnosing software bugs.",
        iconName: "HelpCircle"
      },
      {
        title: "Fraud Prevention & Legal",
        description: "Detecting unauthorized login attempts, preventing financial abuse, and complying with local regulatory mandates.",
        iconName: "ShieldAlert"
      }
    ]
  },
  {
    id: "financial-data",
    title: "5. Financial Data Safeguards",
    iconName: "CreditCard",
    intro: "Your financial security is our absolute priority. We operate under strict principles to ensure we never have direct access to your payment credentials.",
    paragraphs: [
      "Finlume strictly tracks metadata and user-entered records. We do not link directly to bank accounts unless securely requested, and we enforce the following boundaries:"
    ],
    notice: "Finlume NEVER stores or asks for: Credit/Debit Card PINs, UPI PINs, CVV/CVC numbers, Bank passwords, or OTPs (One-Time Passwords). If bank integrations are enabled in the future, tokenization will be processed exclusively through licensed Open Banking API providers (like Plaid) which keep credentials completely isolated from our servers."
  },
  {
    id: "bill-splitting",
    title: "6. Bill Splitting and Social Data",
    iconName: "Split",
    intro: "Finlume's bill splitting system is built with social interactions in mind, balanced with rigorous privacy controls.",
    paragraphs: [
      "When you split a bill or add participants, those participants can see basic details of that specific bill, including the Bill Amount, Payment Status, and the Names/Profiles of other participants involved.",
      "Important notice: Bill participants can never view your personal dashboards, external expenses, income logs, or unrelated transaction histories. Social visibility is strictly isolated to the shared transaction in question."
    ]
  },
  {
    id: "income-tracking",
    title: "7. Income & Expense Tracking Ownership",
    iconName: "DollarSign",
    intro: "You maintain 100% ownership over your individual financial tracking data.",
    paragraphs: [
      "All logged income sources, transactions, budget limits, custom categories, monthly charts, and generated reports belong strictly to you, the account owner.",
      "This data is private by default and will never be shared with other users, advertisers, or third-party marketing companies."
    ]
  },
  {
    id: "notifications",
    title: "8. Notifications and Alerts",
    iconName: "BellRing",
    intro: "Finlume helps you stay on track with smart notifications. We respect your attention and provide granular configuration options.",
    subsections: [
      {
        title: "Push Notifications",
        description: "Real-time updates delivered to your device, covering active bill splits and urgent budget reminders.",
        items: []
      },
      {
        title: "Reminder Alerts",
        description: "Reminders for upcoming bills, budget limits, savings streaks, and streak maintenance notifications.",
        items: []
      },
      {
        title: "Marketing Notifications",
        description: "Occasional updates regarding new app features, savings challenges, and financial tips. You can opt-out of marketing emails or push notifications at any time in your profile settings.",
        items: []
      }
    ]
  },
  {
    id: "device-permissions",
    title: "9. Device Permissions Explained",
    iconName: "Smartphone",
    intro: "Our mobile-first application requests specific system permissions to enable core features. Below is the purpose of each request:",
    cards: [
      {
        title: "Camera Permission",
        description: "Required for scanning physical receipts, automating transaction logging via OCR, and updating profile photos.",
        iconName: "Camera"
      },
      {
        title: "Storage / Files Access",
        description: "Used to upload existing receipt PDFs, export monthly CSV reports, and save transaction images locally.",
        iconName: "FolderOpen"
      },
      {
        title: "Notifications Permission",
        description: "Enables instant push notifications for split requests, payment reminders, and streak updates.",
        iconName: "Bell"
      },
      {
        title: "Contacts (Future Feature)",
        description: "Will allow you to easily find and select friends to split bills with, without typing emails manually. This will be completely optional.",
        iconName: "Users"
      }
    ]
  },
  {
    id: "cookies",
    title: "10. Cookies & Anonymous Analytics",
    iconName: "Cookie",
    intro: "We use cookies and equivalent local storage keys to optimize your navigation and keep your sessions secure.",
    paragraphs: [
      "Website cookies are essential for maintaining your active logged-in session, storing dashboard preferences (like Dark/Light theme), and tracking app load speeds.",
      "Finlume collects basic anonymous analytics to measure performance, loading issues, and crash rates. We DO NOT use tracking cookies to build advertiser profiles, and we never sell your usage data to third-party data brokers."
    ]
  },
  {
    id: "third-party-services",
    title: "11. Third-Party Service Providers",
    iconName: "Link2",
    intro: "To provide a seamless infrastructure, we partner with specialized, secure cloud providers who are fully compliant with industry safety standards.",
    subsections: [
      {
        title: "Infrastructure & Platform Services",
        description: "We utilize the following service integrations:",
        items: [
          "Supabase: Backend database, storage, and JWT session handling.",
          "Firebase: Dynamic cloud messaging for mobile push notifications.",
          "Google & Apple: Secure authentication integrations.",
          "Analytics Providers: Anonymous crash reporting and performance metrics.",
          "Cloud Hosting (Vercel): Hosting for web app routes and API gateways."
        ]
      }
    ],
    paragraphs: [
      "All service providers are vetted for strict compliance with global privacy standards. For details on how they handle your data, you may review their respective privacy agreements on their official websites."
    ]
  },
  {
    id: "security",
    title: "12. Enterprise-Grade Data Security",
    iconName: "ShieldCheck",
    intro: "We treat your data with the highest level of care. Finlume is designed with layers of physical, technological, and administrative security controls:",
    cards: [
      {
        title: "HTTPS / TLS Encryption",
        description: "All web and API traffic is encrypted in transit using Transport Layer Security (TLS 1.3).",
        iconName: "Lock"
      },
      {
        title: "Encryption at Rest",
        description: "Your financial transactions and personal profiles are stored in database disks encrypted with AES-256 standard.",
        iconName: "FolderLock"
      },
      {
        title: "Granular Access Controls",
        description: "Strict logical isolation. No engineer or employee has unmonitored access to production database records.",
        iconName: "Key"
      },
      {
        title: "Active Security Monitoring",
        description: "Automated vulnerability scanning, rate limiting on APIs, and real-time firewall threat block systems.",
        iconName: "Activity"
      }
    ],
    notice: "We store no raw credit card numbers or banking passwords. In the event of a suspected security incident, our team operates under a strict Incident Response Plan to mitigate threats and notify affected users immediately."
  },
  {
    id: "data-retention",
    title: "13. Data Retention and Erasure",
    iconName: "Clock",
    intro: "We retain your personal and financial information only as long as your account is active or needed to provide you with the services.",
    paragraphs: [
      "If you choose to delete your Finlume account, we immediately trigger a deletion process that removes your profile, income records, individual transactions, and budgets from our active production database.",
      "Shared items (such as historical bills you split with others) will remain visible to the other participants as part of their transaction record, but your name will be anonymized.",
      "Database backups are overwritten every 30 days. We may retain certain minimal logs where legally required for tax compliance or fraud prevention."
    ]
  },
  {
    id: "user-rights",
    title: "14. Your Rights and Choices",
    iconName: "UserCheck",
    intro: "We believe in giving you complete control over your data. Depending on your jurisdiction (such as EU/UK under GDPR, or India under DPDP), you possess key rights:",
    subsections: [
      {
        title: "Access & Portability",
        description: "You have the right to request a complete copy of all your financial logs and personal profiles in a standard structured CSV or JSON format.",
        items: []
      },
      {
        title: "Correction & Deletion",
        description: "You can update any incorrect profile detail or transaction record directly in the app, or trigger full account deletion at any time.",
        items: []
      },
      {
        title: "Consent Withdrawal",
        description: "You can withdraw consent for processing optional features (such as receiving notifications or accessing location logs) by adjusting your settings.",
        items: []
      }
    ]
  },
  {
    id: "children-privacy",
    title: "15. Children's Privacy",
    iconName: "Baby",
    intro: "Finlume is designed for individuals who are at least 18 years of age (or the minimum legal age in your jurisdiction).",
    paragraphs: [
      "We do not knowingly collect or solicit personal information from children under the age of 13. If we discover that a child under 13 has provided us with personal data, we will immediately delete it from our servers. If you are a parent or guardian and believe your child has created an account, please contact us."
    ]
  },
  {
    id: "international-users",
    title: "16. International Data Transfers",
    iconName: "Globe",
    intro: "Finlume operates globally, which means your data may be processed and stored in servers located outside your home country.",
    paragraphs: [
      "Our main database nodes are located in secure cloud facilities in the United States and Europe. If you access Finlume from other regions, your data is transferred internationally.",
      "We implement Standard Contractual Clauses (SCCs) and comply with recognized cross-border data transfer frameworks to ensure your information receives the same high level of protection regardless of where it is processed."
    ]
  },
  {
    id: "policy-updates",
    title: "17. Policy Updates",
    iconName: "RefreshCw",
    intro: "We may update this Privacy Policy from time to time to reflect changes in our app features or regulatory requirements.",
    paragraphs: [
      "When material changes occur, we will notify you through an in-app notice, a push alert, or an email sent to the address associated with your account.",
      "The 'Last Updated' date at the top of this policy indicates when the latest modifications were published. Your continued use of the app after an update signifies your acceptance of the revised policy."
    ]
  },
  {
    id: "contact",
    title: "18. Contact Information",
    iconName: "Mail",
    intro: "If you have any questions, feedback, complaints, or security concerns regarding this Privacy Policy or our data handling practices, please contact us:",
    contactDetails: {
      email: PRIVACY_METADATA.emailSupport,
      address: PRIVACY_METADATA.addressPlaceholder
    }
  }
];
