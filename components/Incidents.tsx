/**
 * Incidents (S5) — Real-World Proof / Incident Teaser.
 *
 * Ziel: Urgency durch echte Incidents. Faktisch, nicht alarmistisch.
 * Lovable-Breach und Replit-DB-Löschung als konkrete Beispiele.
 */

"use client";

import { ArrowRight, AlertCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { trackCtaClick } from "@/lib/analytics";

interface IncidentsProps {
  onCtaClick: () => void;
}

export function Incidents({ onCtaClick }: IncidentsProps) {
  return (
    <section className="bg-[#FAFAFA]">
      <div className="section-wrapper">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Das passiert, wenn man Security ignoriert
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Echte Vorfälle aus der Community. Keine Theorie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {siteConfig.incidents.map((incident) => (
            <div
              key={incident.platform}
              className="card border-l-4 border-l-orange-500"
            >
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                    {incident.platform}
                  </span>
                  <p className="text-lg font-bold text-slate-900 mt-1">
                    {incident.stat}
                  </p>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                {incident.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              trackCtaClick("incidents_check");
              onCtaClick();
            }}
            className="btn-primary"
          >
            {siteConfig.incidentsCta}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
