/**
 * Root Layout — Wird um alle Seiten gewrapped.
 *
 * Enthält:
 * - Google Analytics 4 Script (via next/third-parties falls verfügbar, sonst manuell)
 * - Inter Font via next/font/google
 * - Globale Meta-Tags und Open Graph aus config.ts
 * - Scroll-Tracking Initialisierung
 */

import type { Metadata } from "next";
import Script from "next/script";
import { siteConfig } from "@/lib/config";
import "@/styles/globals.css";
import { AnalyticsInit } from "@/components/AnalyticsInit";

export const metadata: Metadata = {
  title: siteConfig.metaTitle,
  description: siteConfig.metaDescription,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="de">
      <head>
        {/* Google Fonts — Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
        {/* GA4 — nur laden wenn Measurement ID konfiguriert */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_variant: '${siteConfig.variant}'
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans">
        <AnalyticsInit />
        {children}
      </body>
    </html>
  );
}
