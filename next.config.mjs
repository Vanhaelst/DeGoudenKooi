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
      /*------------------------------- SEO -------------------------------*/
      {
        source: "/contact",
        permanent: true,
        destination: "/nl/contact",
      },
      {
        source: "/boeking",
        permanent: true,
        destination: "/nl/boeking",
      },
      {
        source: "/boeken-of-plannen",
        permanent: true,
        destination: "/nl/boeking",
      },
      {
        source: "/escape-games",
        permanent: true,
        destination: "/nl/escape-rooms?type=game",
      },
      {
        source: "/escape-experience",
        permanent: true,
        destination: "/nl/escape-rooms?type=experience",
      },
      {
        source: "/escape-experiences",
        permanent: true,
        destination: "/nl/escape-rooms?type=experience",
      },
      {
        source: "/en/escape-experiences",
        permanent: true,
        destination: "/en/escape-rooms?type=experience",
      },
      {
        source: "/en/escape-games",
        permanent: true,
        destination: "/en/escape-rooms?type=game",
      },
      {
        source: "/en/boeking-gerechtstraat",
        permanent: true,
        destination: "/en/escape-rooms?type=game",
      },
      {
        source: "/boeking-gerechtstraat",
        permanent: true,
        destination: "/nl/escape-rooms?type=game",
      },
      {
        source: "/en/boeking-haverwerf",
        permanent: true,
        destination: "/en/escape-rooms?type=experience",
      },
      {
        source: "/boeking-haverwerf",
        permanent: true,
        destination: "/nl/escape-rooms?type=experience",
      },
      {
        source: "/boeking-escape-wandeling",
        permanent: true,
        destination: "/nl/escape-rooms/de-nekker",
      },
      {
        source: "/en/boeking-escape-wandeling",
        permanent: true,
        destination: "/en/escape-rooms/de-nekker",
      },
      {
        source: "/escape-wandeling",
        permanent: true,
        destination: "/nl/escape-rooms/de-nekker",
      },
      {
        source: "/en/escape-wandeling",
        permanent: true,
        destination: "/en/escape-rooms/de-nekker",
      },
      {
        source: "/mechelenbon",
        permanent: true,
        destination: "/nl/mechelenbon",
      },
      {
        source: "/befeb-voucher",
        permanent: true,
        destination: "/nl/befeb-voucher",
      },
      {
        source: "/code-van-coppens",
        permanent: true,
        destination: "/nl/code-van-coppens",
      },
      {
        source: "/escape-room-in-belgie",
        permanent: true,
        destination: "/nl/escape-room-in-belgie",
      },
      {
        source: "/escape-room-2-personen",
        permanent: true,
        destination: "/nl/escape-room-2-personen",
      },
      {
        source: "/gezinsbond-voordeel",
        permanent: true,
        destination: "/nl/gezinsbond-voordeel",
      },
      {
        source: "/sint-romboutstoren-mechelen",
        permanent: true,
        destination: "/nl/sint-romboutstoren-mechelen",
      },
      {
        source: "/interactieve-wandeling",
        permanent: true,
        destination: "/nl/interactieve-wandeling",
      },
      {
        source: "/escape-room-kleine-groep",
        permanent: true,
        destination: "/nl/escape-room-kleine-groep",
      },
      {
        source: "/bedrijfstrainingen-teambuilding",
        permanent: true,
        destination: "/nl/bedrijfstrainingen-teambuilding",
      },
      {
        source: "/originele-wandeling",
        permanent: true,
        destination: "/nl/originele-wandeling",
      },
      {
        source: "/escape-room-thema",
        permanent: true,
        destination: "/nl/escape-room-thema",
      },
      {
        source: "/teambuilding-mechelen",
        permanent: true,
        destination: "/nl/teambuilding-mechelen",
      },
      {
        source: "/escape-room-gezin",
        permanent: true,
        destination: "/nl/blog/escape-room-met-kinderen",
      },
      {
        source: "/escape-room-groepen",
        permanent: true,
        destination: "/nl/escape-room-kleine-groep",
      },
      {
        source: "/escape-room-leeftijd",
        permanent: true,
        destination: "/nl/faq",
      },
      {
        source: "/jobs",
        permanent: true,
        destination: "/nl/jobs",
      },
      {
        source: "/hotels-in-mechelen",
        permanent: true,
        destination: "/nl/hotels-in-mechelen",
      },
      {
        source: "/activiteiten",
        permanent: true,
        destination: "/nl/activiteiten-in-mechelen",
      },
      {
        source: "/awards",
        permanent: true,
        destination: "/nl/awards",
      },
      {
        source: "/gezinsbond",
        permanent: true,
        destination: "/nl/gezinsbond-voordeel",
      },
      {
        source: "/escape-wandeling-mechelen",
        permanent: true,
        destination: "/nl/escape-rooms/de-nekker",
      },
      {
        source: "/escape-room-belgie",
        permanent: true,
        destination: "/nl/escape-room-in-belgie",
      },
      {
        source: "/hapje-eten",
        permanent: true,
        destination: "/nl/hapje-eten",
      },
      {
        source: "/cadeaubon",
        permanent: true,
        destination: "/nl/cadeaubon",
      },
      {
        source: "/",
        permanent: true,
        destination: "/nl/",
      },
      {
        source: "/escape-experience-next-level-escape-rooms",
        permanent: true,
        destination: "/nl/blog/next-level-escape-rooms",
      },
      {
        source: "/escape-room-tips",
        permanent: true,
        destination: "/nl/blog/escape-room-tips",
      },
      {
        source: "/je-planning",
        permanent: true,
        destination: "/nl/je-planning",
      },

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
        source: "/en/gift-voucher",
        permanent: true,
        destination: "/en/giftcard",
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
        source: "/nl/saint-rumbolds-cathedral-tower",
        permanent: true,
        destination: "/nl/sint-romboutstoren-mechelen",
      },
      /* Redirects NL -> EN */
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
        destination: "/en/grab-a-bite",
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

      {
        source: "/en/sint-romboutstoren-mechelen",
        permanent: true,
        destination: "/en/saint-rumbolds-cathedral-tower",
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
      },
      /* Redirects BOOKEO */
      {
        source: "/je-boeking.html",
        permanent: true,
        destination: "/nl/boeking",
      },
      {
        source: "/je-boeking",
        permanent: true,
        destination: "/nl/boeking",
      },
      /*------------------------------- De Nekker -------------------------------*/
      {
        source: "/de-nekker-escape-wandeling-locatie1",
        destination: "/nl/de-nekker-escape-wandeling/locatie-1",
        permanent: true,
      },
      {
        source: "/de-nekker-escape-wandeling-locatie2",
        destination: "/nl/de-nekker-escape-wandeling/locatie-2",
        permanent: true,
      },
      {
        source: "/de-nekker-escape-wandeling-locatie3",
        destination: "/nl/de-nekker-escape-wandeling/locatie-3",
        permanent: true,
      },
      {
        source: "/de-nekker-escape-wandeling-locatie4",
        destination: "/nl/de-nekker-escape-wandeling/locatie-4",
        permanent: true,
      },
      {
        source: "/de-nekker-escape-wandeling-locatie5",
        destination: "/nl/de-nekker-escape-wandeling/locatie-5",
        permanent: true,
      },
      {
        source: "/de-nekker-escape-wandeling-locatie6",
        destination: "/nl/de-nekker-escape-wandeling/locatie-6",
        permanent: true,
      },
      {
        source: "/de-nekker-escape-wandeling-locatie7",
        destination: "/nl/de-nekker-escape-wandeling/locatie-7",
        permanent: true,
      },
      {
        source: "/de-nekker-escape-wandeling-locatie8",
        destination: "/nl/de-nekker-escape-wandeling/locatie-8",
        permanent: true,
      },
      {
        source: "/de-nekker-escape-wandeling-locatie9",
        destination: "/nl/de-nekker-escape-wandeling/locatie-9",
        permanent: true,
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
        source: "/aircotech",
        destination: "/nl/aircotech-cool-at-what-we-do",
      },{
        source: "/nl/aircotech",
        destination: "/nl/aircotech-cool-at-what-we-do",
      },
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
