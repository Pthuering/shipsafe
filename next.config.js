/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/shipsafe",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
