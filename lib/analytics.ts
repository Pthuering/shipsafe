/**
 * Zentrales Analytics-Modul für GA4 Event-Tracking.
 *
 * Alle Events werden mit page_variant als Standard-Parameter gefeuert,
 * damit A/B-Vergleiche zwischen Zielgruppen-Varianten möglich sind.
 *
 * Nutzung: import { trackEvent } from "@/lib/analytics";
 *          trackEvent("cta_click", { label: "hero_scan" });
 */

import { siteConfig } from "./config";

// GA4 gtag Typdefinition
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Feuert ein GA4 Custom Event mit Standard-Parametern.
 * Schlägt still fehl wenn GA4 nicht geladen ist (z.B. lokal).
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", eventName, {
    page_variant: siteConfig.variant,
    timestamp: new Date().toISOString(),
    ...params,
  });
}

/**
 * Trackt CTA-Klicks mit einheitlichem Event-Namen.
 * Label identifiziert den konkreten Button.
 */
export function trackCtaClick(label: string) {
  trackEvent("cta_click", { label });
}

/**
 * Trackt die Auswahl eines Pricing-Plans.
 */
export function trackPlanSelected(planName: string) {
  trackEvent("plan_selected", { plan: planName });
}

/**
 * Trackt wenn das Waitlist-Gate angezeigt wird.
 */
export function trackWaitlistGateShown() {
  trackEvent("waitlist_gate_shown");
}

/**
 * Trackt eine erfolgreiche Waitlist-Anmeldung.
 */
export function trackWaitlistSignup(email: string) {
  trackEvent("waitlist_signup", {
    // E-Mail wird NICHT an GA4 geschickt (PII) —
    // nur die Tatsache der Anmeldung wird getrackt
    method: siteConfig.tallyFormId ? "tally" : "supabase",
  });
}

/**
 * Initialisiert Scroll-Depth-Tracking.
 * Feuert Events bei 25%, 50%, 75% und 100% Scroll-Tiefe.
 * Wird einmal in layout.tsx aufgerufen.
 */
export function initScrollTracking() {
  if (typeof window === "undefined") return;

  const thresholds = [25, 50, 75, 100];
  const fired = new Set<number>();

  function checkScroll() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

    for (const threshold of thresholds) {
      if (scrollPercent >= threshold && !fired.has(threshold)) {
        fired.add(threshold);
        trackEvent("scroll_depth", { depth: threshold });
      }
    }
  }

  window.addEventListener("scroll", checkScroll, { passive: true });
}

/**
 * Erstellt einen IntersectionObserver der feuert wenn ein Element sichtbar wird.
 * Genutzt für pricing_view und andere Viewport-basierte Events.
 */
export function trackElementView(
  elementId: string,
  eventName: string,
  params?: Record<string, string | number>
) {
  if (typeof window === "undefined") return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          trackEvent(eventName, params);
          observer.disconnect();
        }
      }
    },
    { threshold: 0.3 }
  );

  // Warte bis DOM geladen
  const tryObserve = () => {
    const el = document.getElementById(elementId);
    if (el) {
      observer.observe(el);
    } else {
      requestAnimationFrame(tryObserve);
    }
  };
  tryObserve();
}
