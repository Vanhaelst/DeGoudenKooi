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
      /* Redirects EN -> NL*/
      {
        source: "/nl/about-us",
        permanent: true,
        destination: "/nl/over-ons",
      },
      {
        source: "/nl/giftcard",
        permanent: true,
        destination: "/nl/cadeaubon",
      },
      {
        source: "/nl/press",
        permanent: true,
        destination: "/nl/pers",
      },
      {
        source: "/nl/activities-in-mechelen",
        permanent: true,
        destination: "/nl/activiteiten-in-mechelen",
      },
      {
        source: "/nl/grab-a-bite",
        permanent: true,
        destination: "/nl/hapje-eten",
      },
      {
        source: "/nl/escape-rooms/the-treasure-of-kalakmul",
        permanent: true,
        destination: "/nl/escape-rooms/de-schat-van-kalakmul",
      },
      {
        source: "/nl/escape-rooms/the-master-thief-of-mechelen",
        permanent: true,
        destination: "/nl/escape-rooms/de-meesterdief-van-mechelen",
      },
      {
        source: "/nl/escape-rooms/the-secret-of-saint-rumoldus",
        permanent: true,
        destination: "/nl/escape-rooms/het-geheim-van-sint-rumoldus",
      },
      {
        source: "/nl/escape-rooms/hans-revenge",
        permanent: true,
        destination: "/nl/escape-rooms/de-wraak-van-han",
      },
      {
        source: "/nl/je-boeking",
        permanent: true,
        destination: "/nl/boeking",
      },
      {
        source: "/nl/booking",
        permanent: true,
        destination: "/nl/boeking",
      },
      {
        source: "/nl/your-planning",
        permanent: true,
        destination: "/nl/je-planning",
      },
      {
        source: "/en/jobs",
        permanent: true,
        destination: "/en",
      },
      {
        source: "/en/nieuws",
        permanent: true,
        destination: "/en",
      } /* Redirects NL -> EN */,
      {
        source: "/en/over-ons",
        destination: "/en/about-us",
        permanent: true,
      },
      {
        source: "/en/cadeaubon",
        permanent: true,
        destination: "/en/giftcard",
      },
      {
        source: "/en/pers",
        permanent: true,
        destination: "/en/press",
      },
      {
        source: "/en/activiteiten-in-mechelen",
        permanent: true,
        destination: "/en/activities-in-mechelen",
      },
      {
        source: "/en/hapje-eten",
        permanent: true,
        destination: "/nl/grab-a-bite",
      },
      {
        source: "/en/escape-rooms/de-schat-van-kalakmul",
        permanent: true,
        destination: "/en/escape-rooms/the-treasure-of-kalakmul",
      },
      {
        source: "/en/escape-rooms/de-meesterdief-van-mechelen",
        permanent: true,
        destination: "/en/escape-rooms/the-master-thief-of-mechelen",
      },
      {
        source: "/en/escape-rooms/het-geheim-van-sint-rumoldus",
        permanent: true,
        destination: "/en/escape-rooms/the-secret-of-saint-rumoldus",
      },
      {
        source: "/en/escape-rooms/de-wraak-van-han",
        permanent: true,
        destination: "/en/escape-rooms/hans-revenge",
      },
      {
        source: "/en/boeking",
        permanent: true,
        destination: "/en/booking",
      },
      {
        source: "/en/je-planning",
        permanent: true,
        destination: "/en/your-planning",
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
