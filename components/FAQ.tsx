/**
 * FAQ (S7) — Letzte Einwände killen.
 *
 * Einfaches Accordion ohne externe Dependencies.
 * Fragen und Antworten kommen komplett aus config.ts.
 */

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#FAFAFA]">
      <div className="section-wrapper">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Häufige Fragen
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {siteConfig.faq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="card !p-0 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left
                    hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="px-5 pb-5 text-slate-500 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
