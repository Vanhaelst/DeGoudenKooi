/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "degoudenkooi.pluxit.be",
      },
      {
        protocol: "https",
        hostname: "degoudenkooi.pluxit.be",
      },
      {
        protocol: "https",
        hostname: "befeb.be",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/google",
        permanent: false,
        destination: "https://www.google.com",
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/nl",
      },
      {
        source: "/boeking",
        destination: "/nl/reserveer",
      },
      {
        source: "/en/about-us",
        destination: "/en/over-ons",
      },
      {
        source: "/en/overview",
        destination: "/en/overzicht",
      },
      {
        source: "/en/news",
        destination: "/en/nieuws",
      },
      {
        source: "/en/news/:nieuws",
        destination: "/en/nieuws/:nieuws",
      },
      {
        source: "/en/reserve",
        destination: "/en/reserveer",
      },
      {
        source: "/en/book-now",
        destination: "/en/reserveer",
      },
      {
        source: "/nl/boek-nu",
        destination: "/nl/reserveer",
      },
    ];
  },
};

export default nextConfig;
