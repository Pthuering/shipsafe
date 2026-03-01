/**
 * Zentrale Konfiguration für die Landing Page Variante.
 *
 * Für eine neue Zielgruppen-Variante: Nur diese Datei anpassen.
 * Alle Komponenten lesen ihre Texte, Farben und Einstellungen hieraus.
 * So bleibt der Komponenten-Code für alle Varianten identisch.
 */

export const siteConfig = {
  // --- Varianten-ID für Analytics (wird als page_variant mitgeschickt) ---
  variant: "indie_v1",

  // --- Branding ---
  name: "ShipSafe",
  url: "https://shipsafe.dev",
  domain: "shipsafe.dev",

  // --- Hero (S1) ---
  headline:
    "Deine AI-gebaute App hat Sicherheitslücken. Finde sie in 60 Sekunden.",
  subheadline:
    "URL eingeben, Schwachstellen sehen, Fixes direkt in Cursor oder Lovable einfügen. Kein Security-Wissen nötig.",
  heroCta: "Jetzt App scannen — kostenlos",
  heroPlaceholder: "https://deine-app.vercel.app",

  // --- Social Proof (S2) ---
  socialProofStat:
    "45% aller AI-generierten Codes enthalten Sicherheitslücken",
  socialProofSource: "Veracode 2025",
  platforms: ["Cursor", "Lovable", "Bolt", "Replit", "v0"],

  // --- How it Works (S3) ---
  steps: [
    {
      number: "1",
      title: "URL einfügen",
      description:
        "Paste die URL deiner App — das ist alles, was wir brauchen.",
    },
    {
      number: "2",
      title: "Scan läuft automatisch",
      description:
        "ShipSafe prüft deine App auf die häufigsten Schwachstellen von AI-generiertem Code.",
    },
    {
      number: "3",
      title: "Copy-Paste-Fixes",
      description:
        "Jeder Fund kommt mit einem Fix, formatiert für dein AI-Tool. Einfügen, fertig.",
    },
  ],
  stepsCta: "Meinen ersten Scan starten",

  // --- Features (S4) ---
  features: [
    {
      title: "60-Sekunden-Scan",
      description:
        "Paste deine URL. Kein Setup, kein CLI, kein Repo-Zugang nötig.",
      icon: "Zap" as const,
    },
    {
      title: "Copy-Paste-Fixes",
      description:
        "Jeder Fund kommt mit einem Fix, formatiert für dein AI-Tool. Einfach einfügen, fertig.",
      icon: "ClipboardCopy" as const,
    },
    {
      title: "Plattform-spezifisch",
      description:
        "Findet die typischen Lücken von Lovable, Bolt, Cursor & Co. — nicht generische Enterprise-Findings.",
      icon: "Layers" as const,
    },
    {
      title: "Trust Badge",
      description:
        "Zeig deinen Nutzern, dass deine App geprüft ist. Vertrauen als Feature.",
      icon: "ShieldCheck" as const,
    },
  ],

  // --- Incidents (S5) ---
  incidents: [
    {
      platform: "Lovable",
      stat: "18.697 Datensätze exponiert",
      description:
        "Ein mit Lovable gebautes Projekt exponierte eine ungesicherte Supabase-Instanz — über 18.000 Nutzerdatensätze waren öffentlich zugänglich.",
    },
    {
      platform: "Replit",
      stat: "Komplette DB gelöscht",
      description:
        "Ein Replit-Deployment ohne Zugriffskontrolle ermöglichte es Dritten, die gesamte Datenbank zu löschen.",
    },
  ],
  incidentsCta: "Ist deine App sicher?",

  // --- Pricing (S6) ---
  pricing: [
    {
      name: "Einzelscan",
      price: "$9",
      period: "einmalig",
      description: "Ein vollständiger Security-Scan deiner App.",
      features: [
        "1 URL scannen",
        "Vollständiger Schwachstellen-Report",
        "Copy-Paste-Fixes für dein AI-Tool",
        "24h Support per E-Mail",
      ],
      cta: "Einzelscan kaufen",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/Monat",
      description: "Unbegrenzte Scans für alle deine Projekte.",
      features: [
        "Unbegrenzte Scans",
        "Monitoring — automatische Re-Scans",
        "Trust Badge für deine App",
        "Priority Support",
        "Plattform-spezifische Insights",
      ],
      cta: "Pro-Plan starten",
      highlighted: true,
    },
  ],

  // --- Waitlist Gate ---
  waitlistHeadline: "Du bist fast drin.",
  waitlistText:
    "ShipSafe ist aktuell in der geschlossenen Beta — wir lassen Nutzer in Wellen rein, um Scan-Qualität zu garantieren. Sichere dir jetzt deinen Platz und erhalte 50% auf deinen ersten Scan zum Launch.",
  waitlistSubtext: "Du bekommst eine Mail, sobald du dran bist.",
  waitlistCta: "Platz sichern + 50% Rabatt",
  waitlistSuccess:
    "Du bist auf der Liste! Wir melden uns, sobald dein Platz frei ist.",

  // --- FAQ (S7) ---
  faq: [
    {
      question: "Kann ChatGPT das nicht auch?",
      answer:
        "ChatGPT kann Code reviewen, aber nicht deine live App von außen auf reale Schwachstellen scannen. ShipSafe testet deine deployten Endpoints, Headers und Konfigurationen — nicht nur den Quellcode.",
    },
    {
      question: "Meine App ist doch nur ein kleines Side Project…",
      answer:
        "Gerade kleine Projekte werden gezielt angegriffen, weil Angreifer wissen, dass dort oft keine Security existiert. Ein exponierter API-Key oder eine offene Datenbank reicht.",
    },
    {
      question: "Wie schnell bekomme ich Ergebnisse?",
      answer:
        "Der Scan dauert unter 60 Sekunden. Du bekommst sofort einen Report mit priorisierten Findings und kopierbaren Fixes.",
    },
    {
      question: "Was passiert mit meinem Code / meinen Daten?",
      answer:
        "Wir scannen nur öffentlich erreichbare Endpoints deiner App — wir brauchen keinen Zugang zu deinem Code oder Repo. Scan-Ergebnisse werden verschlüsselt gespeichert und nach 30 Tagen gelöscht.",
    },
  ],

  // --- Final CTA (S8) ---
  finalHeadline: "Schick deine App nicht ohne Check live.",
  finalCta: "App jetzt absichern",

  // --- Footer ---
  footerLinks: [
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "Impressum", href: "/impressum" },
  ],

  // --- SEO ---
  metaTitle:
    "ShipSafe — Security Scan für AI-gebaute Apps | Cursor, Lovable",
  metaDescription:
    "Finde Sicherheitslücken in deiner Vibe-Coded App in 60 Sekunden. Copy-Paste-Fixes für Cursor, Lovable, Bolt & Co. Kein Security-Wissen nötig.",

  // --- Design Tokens ---
  colors: {
    primary: "#0F172A",
    accentGreen: "#22C55E",
    accentOrange: "#F97316",
    background: "#FAFAFA",
    cardBg: "#FFFFFF",
    subtleText: "#64748B",
  },

  // --- Tally Form ---
  tallyFormId: "",
} as const;
