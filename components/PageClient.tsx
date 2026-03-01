/**
 * PageClient — Client-Wrapper für die gesamte Seite.
 *
 * Verwaltet den zentralen State für das Waitlist-Gate:
 * Wenn ein User in Pricing oder Hero auf einen CTA klickt,
 * wird showWaitlist=true gesetzt und das Gate als Modal angezeigt.
 */

"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Incidents } from "@/components/Incidents";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WaitlistGate } from "@/components/WaitlistGate";

export function PageClient() {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  function handleCtaClick(planName?: string) {
    if (planName) setSelectedPlan(planName);
    setShowWaitlist(true);
  }

  return (
    <>
      <main>
        <Hero onCtaClick={() => handleCtaClick()} />
        <SocialProof />
        <HowItWorks onCtaClick={() => handleCtaClick()} />
        <Features />
        <Incidents onCtaClick={() => handleCtaClick()} />
        <Pricing onPlanSelect={(plan) => handleCtaClick(plan)} />
        <FAQ />
        <FinalCTA onCtaClick={() => handleCtaClick()} />
      </main>
      <Footer />

      {/* Waitlist Gate als Modal-Overlay */}
      {showWaitlist && (
        <WaitlistGate
          selectedPlan={selectedPlan}
          onClose={() => setShowWaitlist(false)}
        />
      )}
    </>
  );
}
