/**
 * Pricing (S6) — Conversion-Sektion.
 *
 * Zeigt Pricing-Pakete nebeneinander. Das highlighted-Paket (Pro)
 * wird visuell hervorgehoben. Jeder CTA-Klick feuert plan_selected
 * mit dem Paket-Namen und aktiviert dann das Waitlist-Gate.
 *
 * Das id="pricing" wird für das automatische pricing_view Tracking
 * via IntersectionObserver in AnalyticsInit.tsx genutzt.
 */

"use client";

import { Check, ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { trackPlanSelected } from "@/lib/analytics";

interface PricingProps {
  onPlanSelect: (planName: string) => void;
}

export function Pricing({ onPlanSelect }: PricingProps) {
  return (
    <section id="pricing" className="bg-white">
      <div className="section-wrapper">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Einfache Preise. Kein Abo-Zwang.
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Starte mit einem Einzelscan oder sichere alle deine Projekte
            dauerhaft ab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {siteConfig.pricing.map((plan) => (
            <div
              key={plan.name}
              className={`card relative flex flex-col ${
                plan.highlighted
                  ? "border-2 border-orange-500 shadow-lg shadow-orange-500/10"
                  : ""
              }`}
            >
              {/* "Empfohlen" Badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Empfohlen
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                <p className="text-slate-500 text-sm mt-1">{plan.description}</p>
              </div>

              {/* Preis */}
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-slate-900">
                  {plan.price}
                </span>
                <span className="text-slate-400 ml-1">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => {
                  trackPlanSelected(plan.name);
                  onPlanSelect(plan.name);
                }}
                className={`w-full ${
                  plan.highlighted ? "btn-primary" : "btn-secondary"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
