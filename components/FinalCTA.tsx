/**
 * FinalCTA (S8) — Letzte Conversion-Chance.
 *
 * Wiederholt URL-Eingabe und CTA. Enthält einen visuellen
 * Trust Badge Preview als zusätzlichen Anreiz.
 */

"use client";

import { useState } from "react";
import { ArrowRight, ShieldCheck, CheckCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { trackCtaClick } from "@/lib/analytics";

interface FinalCTAProps {
  onCtaClick: () => void;
}

export function FinalCTA({ onCtaClick }: FinalCTAProps) {
  const [url, setUrl] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackCtaClick("final_cta");
    onCtaClick();
  }

  return (
    <section className="bg-slate-900 text-white">
      <div className="section-wrapper text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          {siteConfig.finalHeadline}
        </h2>
        <p className="text-slate-300 max-w-lg mx-auto mb-10">
          Ein Scan. 60 Sekunden. Gewissheit, dass deine User sicher sind.
        </p>

        {/* URL Input + CTA */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-10"
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={siteConfig.heroPlaceholder}
            className="flex-1 px-4 py-3.5 rounded-lg bg-white/10 border border-white/20
              text-white placeholder:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
              text-sm sm:text-base"
          />
          <button type="submit" className="btn-primary whitespace-nowrap py-3.5">
            {siteConfig.finalCta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Trust Badge Preview */}
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/20">
            <ShieldCheck className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
              Verified by ShipSafe
            </p>
            <p className="text-xs text-slate-400">
              Dieses Badge können deine Nutzer sehen
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
