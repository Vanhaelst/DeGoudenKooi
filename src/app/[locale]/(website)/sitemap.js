import { getAlternates } from "@/data/metadata";
import { fetchData, REVALIDATE } from "@/utils/fetchData";

const locales = ["nl", "en"];

const staticPages = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "escape-rooms", changeFrequency: "weekly", priority: 0.9 },
  { path: "boeking", changeFrequency: "weekly", priority: 0.9 },
  { path: "contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "cadeaubon", changeFrequency: "monthly", priority: 0.8 },
  { path: "over-ons", changeFrequency: "monthly", priority: 0.7 },
  { path: "teambuilding-events", changeFrequency: "monthly", priority: 0.7 },
  {
    path: "activiteiten-in-mechelen",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  { path: "hapje-eten", changeFrequency: "monthly", priority: 0.7 },
  { path: "hotels-in-mechelen", changeFrequency: "monthly", priority: 0.7 },
  { path: "awards", changeFrequency: "monthly", priority: 0.6 },
  { path: "blog", changeFrequency: "weekly", priority: 0.6 },
  { path: "nieuws", changeFrequency: "weekly", priority: 0.6 },
  { path: "pers", changeFrequency: "monthly", priority: 0.5 },
  { path: "faq", changeFrequency: "monthly", priority: 0.5 },
  { path: "privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "jobs", changeFrequency: "monthly", priority: 0.3 },
  { path: "je-planning", changeFrequency: "monthly", priority: 0.3 },
  { path: "shop", changeFrequency: "monthly", priority: 0.3 },
];

const sitemapEntry = ({
  locale,
  path,
  lastModified = new Date(),
  changeFrequency = "monthly",
  priority = 0.5,
}) => {
  const alternates = getAlternates({ locale, path });

  return {
    url: alternates.canonical,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: alternates.languages,
    },
  };
};

const toEntryDate = (entry) =>
  entry?.dateUpdated || entry?.postDate || new Date();

const stripLocaleFromUri = (uri = "") => uri.replace(/^(nl|en)\//, "");

const lastPathSegment = (uri = "") => stripLocaleFromUri(uri).split("/").pop();

const uniqueByUrl = (entries) => {
  const seen = new Set();

  return entries.filter((entry) => {
    if (seen.has(entry.url)) {
      return false;
    }

    seen.add(entry.url);
    return true;
  });
};

async function getWebsiteEntries(language) {
  return fetchData(
    `
      query SitemapQuery {
        seoPages: seoPagesEntries(language: "${language}") {
          ... on page_Entry {
            id
            slug
            uri
            dateUpdated
          }
        }
        rooms: roomsEntries(language: "${language}") {
          ... on game_Entry {
            id
            slug
            uri
            dateUpdated
          }
        }
        blogs: blogsEntries(language: "${language}", orderBy: "postDate desc") {
          ... on newsItem_Entry {
            id
            slug
            uri
            postDate
            dateUpdated
          }
        }
        news: newsEntries(language: "${language}", orderBy: "postDate desc") {
          ... on article_Entry {
            id
            slug
            uri
            postDate
            dateUpdated
          }
        }
      }
    `,
    {
      revalidate: REVALIDATE,
      tags: [`sitemap`, `language-${language}`],
    },
  );
}

export default async function sitemap() {
  const entriesByLocale = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      ...(await getWebsiteEntries(locale)),
    })),
  );

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => sitemapEntry({ locale, ...page })),
  );

  const seoPageEntries = entriesByLocale.flatMap(({ locale, seoPages = [] }) =>
    seoPages.map((page) =>
      sitemapEntry({
        locale,
        path: stripLocaleFromUri(page.uri || page.slug),
        lastModified: toEntryDate(page),
        changeFrequency: "monthly",
        priority: 0.6,
      }),
    ),
  );

  const roomEntries = entriesByLocale.flatMap(({ locale, rooms = [] }) =>
    rooms.map((room) =>
      sitemapEntry({
        locale,
        path: `escape-rooms/${lastPathSegment(room.uri || room.slug)}`,
        lastModified: toEntryDate(room),
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    ),
  );

  const blogEntries = entriesByLocale.flatMap(({ locale, blogs = [] }) =>
    blogs.map((blog) =>
      sitemapEntry({
        locale,
        path: `blog/${lastPathSegment(blog.uri || blog.slug)}`,
        lastModified: toEntryDate(blog),
        changeFrequency: "monthly",
        priority: 0.5,
      }),
    ),
  );

  const newsEntries = entriesByLocale.flatMap(({ locale, news = [] }) =>
    news.map((article) =>
      sitemapEntry({
        locale,
        path: `nieuws/${lastPathSegment(article.uri || article.slug)}`,
        lastModified: toEntryDate(article),
        changeFrequency: "monthly",
        priority: 0.5,
      }),
    ),
  );

  return uniqueByUrl([
    ...staticEntries,
    ...seoPageEntries,
    ...roomEntries,
    ...blogEntries,
    ...newsEntries,
  ]);
}
