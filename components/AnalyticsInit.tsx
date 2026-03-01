/**
 * AnalyticsInit — Client-Komponente die Scroll-Tracking und
 * Viewport-basiertes Tracking beim Mount initialisiert.
 * Wird in layout.tsx eingebunden.
 */

"use client";

import { useEffect } from "react";
import { initScrollTracking, trackElementView } from "@/lib/analytics";

export function AnalyticsInit() {
  useEffect(() => {
    initScrollTracking();
    trackElementView("pricing", "pricing_view");
  }, []);

  return null;
}
