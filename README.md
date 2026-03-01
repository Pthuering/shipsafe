# ShipSafe Landing Page

Deploy-fertige Landing Page für den ShipSafe Fake-Door-Test.
Next.js 14 (App Router), Tailwind CSS, GA4 Event-Tracking.

## Quick Start

```bash
# 1. Dependencies installieren
npm install

# 2. Env-Datei erstellen
cp .env.example .env.local

# 3. Werte eintragen:
#    - NEXT_PUBLIC_GA_ID (Google Analytics 4)
#    - tallyFormId in lib/config.ts (Tally.so Formular)

# 4. Dev-Server starten
npm run dev
```

Seite läuft auf `http://localhost:3000`.

## Deployment auf Vercel

1. GitHub Repo erstellen und Code pushen
2. In Vercel: "Import Project" → GitHub Repo auswählen
3. Environment Variables setzen:
   - `NEXT_PUBLIC_GA_ID` = deine GA4 Measurement ID
4. Deploy — fertig.

Vercel erkennt Next.js automatisch. Kein Build-Config nötig.

## Projekt-Struktur

```
/app
  layout.tsx          → Meta-Tags, GA4-Script, Font (Inter)
  page.tsx            → Importiert PageClient

/components
  PageClient.tsx      → Client-Wrapper, managed Waitlist-Gate State
  Hero.tsx            → S1: Above the Fold mit Fake-URL-Input
  SocialProof.tsx     → S2: Veracode-Stat + Plattform-Badges
  HowItWorks.tsx      → S3: 3-Step Prozess
  Features.tsx        → S4: 4 Feature-Cards
  Incidents.tsx       → S5: Real-World Breach-Stories
  Pricing.tsx         → S6: Einzelscan + Pro Plan
  FAQ.tsx             → S7: Accordion mit Einwand-Handling
  FinalCTA.tsx        → S8: Letzter CTA mit Trust Badge Preview
  WaitlistGate.tsx    → Modal: E-Mail Capture mit Beta-Framing
  Footer.tsx          → Legal Links + Branding
  AnalyticsInit.tsx   → Scroll-Tracking + Viewport-Tracking Init

/lib
  config.ts           → ZENTRALE CONFIG — alle Texte, Farben, Einstellungen
  analytics.ts        → GA4 Event-Tracking Funktionen

/styles
  globals.css         → Tailwind + Custom Component Classes
```

## Neue Variante anlegen

Jede Zielgruppen-Variante ist ein eigener Branch mit eigener `config.ts`.

```bash
# 1. Neuen Branch erstellen
git checkout -b variante/kmu_v1

# 2. lib/config.ts anpassen:
#    - variant: "kmu_v1"
#    - headline, subheadline, etc. für KMU-Zielgruppe

# 3. Pushen — Vercel erstellt automatisch ein Preview-Deployment
git push origin variante/kmu_v1

# 4. In Vercel: Branch als eigenes Production-Deployment konfigurieren
#    (Custom Domain oder separate Vercel-Projekt)
```

**Wichtig:** Nur `lib/config.ts` ändern. Nie den Komponenten-Code.

## Analytics Events

| Event                | Wann                          | Parameter       |
| -------------------- | ----------------------------- | --------------- |
| `page_view`          | Automatisch (GA4)             | page_variant    |
| `cta_click`          | Jeder primäre Button          | label           |
| `pricing_view`       | Pricing-Sektion wird sichtbar | —               |
| `plan_selected`      | User wählt ein Paket          | plan            |
| `waitlist_gate_shown`| Waitlist-Modal öffnet sich    | —               |
| `waitlist_signup`    | E-Mail wird eingetragen       | method          |
| `scroll_depth`       | 25%, 50%, 75%, 100%           | depth           |

Alle Events enthalten automatisch `page_variant` und `timestamp`.

## Deployment-Checkliste

- [ ] `NEXT_PUBLIC_GA_ID` in Vercel Environment Variables gesetzt
- [ ] `tallyFormId` in `lib/config.ts` eingetragen
- [ ] `variant` korrekt gesetzt (z.B. "indie_v1")
- [ ] Meta Title + Description in config.ts geprüft
- [ ] Mobile Test auf 375px Breite
- [ ] GA4 Realtime-Report: Events kommen an
- [ ] Vercel Preview-Link funktioniert vor Production-Deploy

## Eigenständige Entscheidungen

1. **Plattform-Logos als Text-Badges:** Statt SVG/PNG-Logos werden die
   Plattform-Namen als gestylte Badges dargestellt. Spart Assets und
   Ladezeit. Können später durch echte Logos ersetzt werden.

2. **Nur 2 Pricing-Pakete statt 3:** Das Strategie-Dokument definiert
   "Single Scan $9 / Pro $29/Monat" — kein drittes Paket. 2 Optionen
   sind für ein Fake-Door-MVP ausreichend und reduzieren Decision Fatigue.

3. **Tally als Default für E-Mail-Capture:** Einfacher als Supabase-Setup
   und schneller live. Supabase-Code ist vorbereitet aber auskommentiert.

4. **WaitlistGate als Modal:** Statt Seiten-Replacement wird ein Modal
   verwendet — besser für UX (User verliert nicht seinen Scroll-Kontext)
   und einfacher im State-Management.

5. **Fehlertolerantes Waitlist-Submit:** Bei Backend-Fehler wird trotzdem
   Erfolg angezeigt. Die Conversion darf nicht an einem Webhook-Fehler
   scheitern — das GA4 Event trackt den Signup unabhängig.

6. **Inter Font beibehalten:** Das Strategie-Dokument definiert Inter
   explizit als gewünscht für die Zielgruppe (SaaS/Indie-Hacker Szene).

7. **Deutsche Sprache:** Die gesamte Page ist deutsch, weil das
   Strategie-Dokument deutsch verfasst ist und die Copy deutsch ist.
   Für eine EN-Variante: neuer Branch mit angepasster config.ts.
