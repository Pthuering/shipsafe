/**
 * Hero (S1) — Above the Fold.
 *
 * Ziel: Problem + Lösung in 3 Sekunden vermitteln.
 * Enthält ein Fake-URL-Eingabefeld das bei Submit den Waitlist-Gate triggert.
 * H1, Subheadline und CTA kommen exakt aus config.ts.
 *
 * Pragmatische Entscheidung: URL-Feld ist ein visuelles Element,
 * keine echte Funktionalität. Klick auf CTA öffnet Waitlist-Gate.
 */

"use client";

import { useState } from "react";
import { ArrowRight, Shield } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { trackCtaClick } from "@/lib/analytics";

interface HeroProps {
  onCtaClick: () => void;
}

export function Hero({ onCtaClick }: HeroProps) {
  const [url, setUrl] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackCtaClick("hero_scan");
    onCtaClick();
  }

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      {/* Subtle gradient overlay für Tiefe */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative section-wrapper py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm text-slate-300">
              Security Scanner für Vibe-Coded Apps
            </span>
          </div>

          {/* H1 — Exakt aus Produktstrategie */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            {siteConfig.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {siteConfig.subheadline}
          </p>

          {/* Fake URL Input + CTA */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
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
            <button type="submit" className="btn-primary whitespace-nowrap text-sm sm:text-base py-3.5">
              {siteConfig.heroCta}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Trust hint */}
          <p className="mt-4 text-xs text-slate-400">
            Kein Signup nötig. Kein Code-Zugang. Ergebnis in 60 Sekunden.
          </p>
        </div>
      </div>
    </section>
  );
}
