export const defaultMetadata = {
  title: "Escape room Mechelen - De Gouden Kooi",
  robots: process.env.NEXT_PUBLIC_META_ROBOTS,
  icons: "/favicons/cropped-pictogram-32x32.png",
  canonicalUrl: "https://degoudenkooi.be/",
  "theme-color": "#987222",
  openGraph: {
    type: "website",
    url: "https://degoudenkooi.be/",
    siteName: "De Gouden Kooi",
    image: [
      {
        url: "https://degoudenkooi.be/share_image_DGK.jpg",
        width: 1080,
        height: 630,
      },
    ],
  },
};

const siteUrl = "https://www.degoudenkooi.be";

const publicPathByRoute = {
  "": {
    nl: "/nl",
    en: "/en",
  },
  "activiteiten-in-mechelen": {
    nl: "/nl/activiteiten-in-mechelen",
    en: "/en/activities-in-mechelen",
  },
  awards: {
    nl: "/nl/awards",
    en: "/en/awards",
  },
  blog: {
    nl: "/nl/blog",
    en: "/en/blog",
  },
  boeking: {
    nl: "/nl/boeking",
    en: "/en/booking",
  },
  cadeaubon: {
    nl: "/nl/cadeaubon",
    en: "/en/giftcard",
  },
  contact: {
    nl: "/nl/contact",
    en: "/en/contact",
  },
  "escape-rooms": {
    nl: "/nl/escape-rooms",
    en: "/en/escape-rooms",
  },
  faq: {
    nl: "/nl/faq",
    en: "/en/faq",
  },
  "hapje-eten": {
    nl: "/nl/hapje-eten",
    en: "/en/grab-a-bite",
  },
  "hotels-in-mechelen": {
    nl: "/nl/hotels-in-mechelen",
    en: "/en/hotels-in-mechelen",
  },
  "je-planning": {
    nl: "/nl/je-planning",
    en: "/en/your-planning",
  },
  jobs: {
    nl: "/nl/jobs",
    en: "/en",
  },
  nieuws: {
    nl: "/nl/nieuws",
    en: "/en/news",
  },
  "over-ons": {
    nl: "/nl/over-ons",
    en: "/en/about-us",
  },
  pers: {
    nl: "/nl/pers",
    en: "/en/press",
  },
  privacy: {
    nl: "/nl/privacy",
    en: "/en/privacy",
  },
  shop: {
    nl: "/nl/shop",
    en: "/en/shop",
  },
  "teambuilding-events": {
    nl: "/nl/teambuilding-events",
    en: "/en/teambuilding-events",
  },
};

const escapeRoomSlugs = {
  "de-schat-van-kalakmul": "the-treasure-of-kalakmul",
  "de-meesterdief-van-mechelen": "the-master-thief-of-mechelen",
  "het-geheim-van-sint-rumoldus": "the-secret-of-saint-rumoldus",
  "de-wraak-van-han": "hans-revenge",
};

const localizedEscapeRoomSlug = (slug, locale) => {
  if (locale === "en") {
    return escapeRoomSlugs[slug] || slug;
  }

  return (
    Object.entries(escapeRoomSlugs).find(
      ([, enSlug]) => enSlug === slug,
    )?.[0] || slug
  );
};

const localizedPath = (path, locale) => {
  const normalizedPath = path.replace(/^\/|\/$/g, "");
  const [route, slug] = normalizedPath.split("/");
  const mappedPath = publicPathByRoute[normalizedPath]?.[locale];

  if (mappedPath) {
    return mappedPath;
  }

  if (route === "escape-rooms" && slug) {
    return `/${locale}/escape-rooms/${localizedEscapeRoomSlug(slug, locale)}`;
  }

  if (route === "nieuws" && slug) {
    return locale === "en"
      ? `/${locale}/news/${slug}`
      : `/${locale}/nieuws/${slug}`;
  }

  if (route === "blog" && slug) {
    return `/${locale}/blog/${slug}`;
  }

  return `/${locale}/${normalizedPath}`;
};

export const getAlternates = ({ locale = "nl", path = "" }) => ({
  canonical: `${siteUrl}${localizedPath(path, locale)}`,
  languages: {
    nl: `${siteUrl}${localizedPath(path, "nl")}`,
    en: `${siteUrl}${localizedPath(path, "en")}`,
  },
});

export const englishMetadata = {
  description:
    "Home ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
  keywords:
    "Escape rooms, Escape Experiences, teambuilding, families, Mechelen",
};
export const dutchMetadata = {
  description:
    "Plan een leuke uitstap met vrienden, familie of collega’s in onze escape room in Mechelen met zes verschillende escape rooms. Boek snel online!",
  keywords: "Escape rooms, Escape Experiences, teambuilding, familie, Mechelen",
};
