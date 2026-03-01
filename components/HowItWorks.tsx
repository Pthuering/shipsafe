/**
 * HowItWorks (S3) — So funktioniert's in 3 Schritten.
 *
 * Ziel: Friction reduzieren. User muss sofort verstehen,
 * dass nur eine URL nötig ist — kein Install, kein Signup.
 * Kritischer Conversion-Punkt laut Produktstrategie.
 */

"use client";

import { ArrowRight, Globe, Scan, Wrench } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { trackCtaClick } from "@/lib/analytics";

interface HowItWorksProps {
  onCtaClick: () => void;
}

const stepIcons = [Globe, Scan, Wrench];

export function HowItWorks({ onCtaClick }: HowItWorksProps) {
  return (
    <section className="bg-[#FAFAFA]">
      <div className="section-wrapper">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            So einfach geht's
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Drei Schritte. Keine Installation. Kein Repo-Zugang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {siteConfig.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <div key={step.number} className="text-center">
                {/* Step number circle */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 text-white mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                {/* Connector line (nur auf Desktop, nicht beim letzten) */}
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              trackCtaClick("how_it_works");
              onCtaClick();
            }}
            className="btn-primary"
          >
            {siteConfig.stepsCta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
