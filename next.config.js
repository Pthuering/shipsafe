/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static Export — generiert reines HTML/CSS/JS statt Server-App
  output: "export",

  // GitHub Pages serviert von /<repo-name>/ — basePath muss matchen.
  // Wenn dein Repo "shipsafe" heißt → basePath: "/shipsafe"
  // Für Custom Domain (z.B. shipsafe.dev) → basePath auskommentieren
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

  // Bilder: Kein Next.js Image Optimizer auf GitHub Pages
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
