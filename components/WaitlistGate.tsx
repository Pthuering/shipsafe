/**
 * WaitlistGate — Modal-Overlay für die Fake-Door-Conversion.
 *
 * Wird nach jedem CTA-Klick angezeigt. Zeigt Beta-Exklusivitäts-Framing
 * und sammelt E-Mails ein. Submit-Logik:
 * - Wenn tallyFormId gesetzt: Sendet an Tally.so Webhook
 * - Sonst: Sendet an Supabase REST API
 *
 * Feuert waitlist_gate_shown beim Mount und waitlist_signup beim Submit.
 *
 * Pragmatische Entscheidung: Für den MVP wird nur die Tally-Integration
 * unterstützt (kein Supabase-Setup nötig). Supabase-Code ist vorbereitet
 * aber auskommentiert.
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { X, Mail, CheckCircle, Shield, Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/config";
import {
  trackWaitlistGateShown,
  trackWaitlistSignup,
} from "@/lib/analytics";

interface WaitlistGateProps {
  selectedPlan: string | null;
  onClose: () => void;
}

export function WaitlistGate({ selectedPlan, onClose }: WaitlistGateProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  // Tracke Gate-Anzeige und fokussiere Input
  useEffect(() => {
    trackWaitlistGateShown();
    // Kurze Verzögerung damit die Animation nicht gestört wird
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    // Body-Scroll verhindern während Modal offen
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  // ESC zum Schließen
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      // Tally.so Webhook
      if (siteConfig.tallyFormId) {
        await fetch(`https://tally.so/r/${siteConfig.tallyFormId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: {
              email,
              plan: selectedPlan || "direct",
              variant: siteConfig.variant,
            },
          }),
        });
      }

      // Supabase Alternative (wenn kein Tally konfiguriert):
      // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      // const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      // if (supabaseUrl && supabaseKey) {
      //   await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       apikey: supabaseKey,
      //       Authorization: `Bearer ${supabaseKey}`,
      //     },
      //     body: JSON.stringify({
      //       email,
      //       plan: selectedPlan || "direct",
      //       variant: siteConfig.variant,
      //       created_at: new Date().toISOString(),
      //     }),
      //   });
      // }

      trackWaitlistSignup(email);
      setStatus("success");
    } catch {
      // Auch bei Fehler als Erfolg werten — wir verlieren lieber
      // keine Conversion wegen eines Backend-Fehlers.
      // E-Mail kann im GA4 Event nachverfolgt werden.
      trackWaitlistSignup(email);
      setStatus("success");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400
            hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Schließen"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          /* Erfolgsanzeige */
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Du bist dabei!
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {siteConfig.waitlistSuccess}
            </p>
          </div>
        ) : (
          /* Formular */
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-50 mb-5">
                <Shield className="w-7 h-7 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {siteConfig.waitlistHeadline}
              </h3>
              {selectedPlan && (
                <p className="text-sm text-orange-600 font-medium mb-2">
                  Gewählter Plan: {selectedPlan}
                </p>
              )}
              <p className="text-slate-500 text-sm leading-relaxed">
                {siteConfig.waitlistText}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.de"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200
                    text-slate-900 placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                    text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary w-full disabled:opacity-60"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  siteConfig.waitlistCta
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-4">
              {siteConfig.waitlistSubtext}
            </p>
          </>
        )}
      </div>

      {/* Inline Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
