/**
 * SocialProof (S2) — Sofortige Glaubwürdigkeit.
 *
 * Zeigt die Veracode-Statistik und die unterstützten Plattform-Namen.
 * Kein CTA in dieser Sektion — rein informativ / vertrauensbildend.
 *
 * Pragmatische Entscheidung: Plattform-Logos werden als Text-Badges
 * dargestellt statt als SVGs/PNGs — spart Ladezeit und ist sofort
 * ohne Asset-Pipeline deploybar. Können später durch echte Logos ersetzt werden.
 */

import { siteConfig } from "@/lib/config";
import { AlertTriangle } from "lucide-react";

export function SocialProof() {
  return (
    <section className="bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Stat */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
          <p className="text-sm sm:text-base text-slate-700 text-center">
            <span className="font-semibold">{siteConfig.socialProofStat}</span>
            <span className="text-slate-400 ml-1">— {siteConfig.socialProofSource}</span>
          </p>
        </div>

        {/* Plattform-Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span className="text-xs text-slate-400 uppercase tracking-wider mr-2">
            Unterstützt:
          </span>
          {siteConfig.platforms.map((platform) => (
            <span
              key={platform}
              className="inline-flex items-center px-3 py-1.5 rounded-md
                bg-slate-50 border border-slate-100
                text-sm font-medium text-slate-600"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
