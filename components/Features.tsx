/**
 * Features (S4) — Benefit-Kommunikation.
 *
 * Zeigt 4 Kern-Features als Cards. Kein CTA — Sektion baut Vertrauen auf.
 * Icons kommen aus Lucide React, Mapping via Icon-Name aus config.ts.
 */

import {
  Zap,
  ClipboardCopy,
  Layers,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/lib/config";

// Icon-Mapping: Config-String → Lucide Component
const iconMap: Record<string, LucideIcon> = {
  Zap,
  ClipboardCopy,
  Layers,
  ShieldCheck,
};

export function Features() {
  return (
    <section className="bg-white">
      <div className="section-wrapper">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Gebaut für AI-gebaute Apps
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Kein Enterprise-Tool. Kein Fachchinesisch. Fixes, die du direkt
            in dein AI-Tool einfügen kannst.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {siteConfig.features.map((feature) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <div key={feature.title} className="card group hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-green-50 text-green-600 mb-4 group-hover:bg-green-100 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
