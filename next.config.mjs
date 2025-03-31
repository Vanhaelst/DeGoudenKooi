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
      /*------------------------------- Nederlands -------------------------------*/
      {
        source: "/nl/boek-nu",
        destination: "/nl/boeking",
      },
      /*------------------------------- Engels -------------------------------*/
      {
        source: "/en/activities-in-mechelen",
        destination: "/en/activiteiten-in-mechelen",
      },
      {
        source: "/en/about-us",
        destination: "/en/over-ons",
      },
      {
        source: "/en/overview",
        destination: "/en/escape-rooms",
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
        source: "/en/booking",
        destination: "/en/boeking",
      },
      {
        source: "/en/book-now",
        destination: "/en/boeking",
      },
      {
        source: "/en/giftcard",
        destination: "/en/cadeaubon",
      },
      {
        source: "/en/grab-a-bite",
        destination: "/en/hapje-eten",
      },
      {
        source: "/en/your-planning",
        destination: "/en/je-planning",
      },
      {
        source: "/en/press",
        destination: "/en/pers",
      },
      /*------------------------------- Aircotech -------------------------------*/
      {
        source: "/aircotech-cool-at-what-we-do",
        destination: "/nl/aircotech-cool-at-what-we-do",
      },
      {
        source: "/en/aircotech-cool-at-what-we-do",
        destination: "/en/aircotech-cool-at-what-we-do",
      },
      {
        source: "/en/aircotech",
        destination: "/en/aircotech-cool-at-what-we-do",
      },
    ];
  },
};

export default nextConfig;
