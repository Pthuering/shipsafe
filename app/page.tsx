/**
 * Hauptseite — Importiert alle 8 Sektionen in der Reihenfolge
 * aus dem Produktstrategie-Dokument:
 * S1 Hero → S2 Social Proof → S3 How it Works → S4 Features →
 * S5 Incidents → S6 Pricing → S7 FAQ → S8 Final CTA → Footer
 *
 * State-Management für das Waitlist-Gate ist hier zentralisiert,
 * damit der Pricing-Klick das Gate modal auslösen kann.
 */

import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Incidents } from "@/components/Incidents";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { PageClient } from "@/components/PageClient";

export default function Home() {
  return <PageClient />;
}
