import { CompanyData } from "@/data/companyData";
import {
  defaultMetadata,
  dutchMetadata,
  englishMetadata,
} from "@/data/metadata";

export const SITE_URL = "https://www.degoudenkooi.be";

const PHONE = "+32 15 67 68 67";
const EMAIL = "info@degoudenkooi.be";

export function absoluteUrl(path) {
  if (!path) {
    return undefined;
  }

  if (path.startsWith("http")) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function cleanText(value) {
  if (!value) {
    return undefined;
  }

  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getLanguage(locale) {
  return locale === "en" ? "en-US" : "nl-BE";
}

export function getLocalizedMetadata(locale) {
  return locale === "en" ? englishMetadata : dutchMetadata;
}

export function getPagePath(locale, path = "") {
  const normalizedPath = path ? `/${path.replace(/^\/+/, "")}` : "";

  return `/${locale || "nl"}${normalizedPath}`;
}

export function getPageUrl(locale, path = "") {
  return `${SITE_URL}${getPagePath(locale, path)}`;
}

export function getSeoValues({ locale, page = {}, fallbackTitle }) {
  const metaData = getLocalizedMetadata(locale);
  const seoImage = page?.seoImage?.[0];
  const image = seoImage?.url || page?.image?.[0]?.url;

  return {
    title:
      page?.seoTitle || page?.title || fallbackTitle || defaultMetadata.title,
    description: cleanText(
      page?.seoDescription ||
        page?.shortDescription ||
        page?.description ||
        metaData.description,
    ),
    image:
      absoluteUrl(image) ||
      absoluteUrl(defaultMetadata.openGraph.image?.[0]?.url),
  };
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: CompanyData.name,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(CompanyData.logo),
      width: CompanyData.logo_width,
      height: CompanyData.logo_height,
    },
    image: absoluteUrl(defaultMetadata.openGraph.image?.[0]?.url),
    email: EMAIL,
    telephone: PHONE,
    foundingDate: "2016",
    slogan: "De meest bekroonde escape rooms van Belgie",
    sameAs: Object.values(CompanyData.socials),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE,
      email: EMAIL,
      contactType: "customer service",
      areaServed: "BE",
      availableLanguage: ["nl", "en"],
    },
  };
}

export function websiteSchema(locale) {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: CompanyData.name,
    inLanguage: getLanguage(locale),
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function localBusinessSchemas({ locale, description, image, url }) {
  const locations = [
    {
      id: "gerechtstraat",
      name: `${CompanyData.name} - Gerechtstraat`,
      streetAddress: "Gerechtstraat 10",
    },
    {
      id: "haverwerf",
      name: `${CompanyData.name} - Haverwerf`,
      streetAddress: "Haverwerf 7",
    },
  ];

  return locations.map((location) => ({
    "@type": "EntertainmentBusiness",
    "@id": `${SITE_URL}/#${location.id}`,
    name: location.name,
    description,
    url,
    image,
    telephone: PHONE,
    email: EMAIL,
    priceRange: "EUR",
    parentOrganization: {
      "@id": `${SITE_URL}/#organization`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: location.streetAddress,
      addressLocality: "Mechelen",
      postalCode: "2800",
      addressCountry: "BE",
    },
    knowsAbout: ["Escape rooms", "Escape experiences", "Teambuilding"],
    additionalProperty: {
      "@type": "PropertyValue",
      name: locale === "en" ? "location" : "locatie",
      value: location.streetAddress,
    },
  }));
}

export function webpageSchema({
  locale,
  path = "",
  page = {},
  type = "WebPage",
  fallbackTitle,
}) {
  const url = getPageUrl(locale, path);
  const seo = getSeoValues({ locale, page, fallbackTitle });

  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: seo.title,
    description: seo.description,
    image: seo.image,
    inLanguage: getLanguage(locale),
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function breadcrumbSchema({ locale, items }) {
  const homeName = locale === "en" ? "Home" : "Home";
  const listItems = [
    {
      name: homeName,
      url: getPageUrl(locale),
    },
    ...items,
  ];

  return {
    "@type": "BreadcrumbList",
    "@id": `${listItems[listItems.length - 1].url}#breadcrumb`,
    itemListElement: listItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function itemListSchema({ id, items }) {
  return {
    "@type": "ItemList",
    "@id": id,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      item: item.item,
    })),
  };
}

export function createJsonLd(graph) {
  return {
    "@context": "https://schema.org",
    "@graph": graph.filter(Boolean),
  };
}

export function JsonLdScript({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function PageJsonLdScript({
  locale,
  path = "",
  page,
  type = "WebPage",
  breadcrumbName,
  includeBusiness = false,
}) {
  const webPage = webpageSchema({ locale, path, page, type });
  const graph = [
    webPage,
    breadcrumbName &&
      breadcrumbSchema({
        locale,
        items: [
          {
            name: breadcrumbName,
            url: webPage.url,
          },
        ],
      }),
  ];

  if (includeBusiness) {
    graph.push(
      ...localBusinessSchemas({
        locale,
        description: webPage.description,
        image: webPage.image,
        url: webPage.url,
      }),
    );
  }

  return <JsonLdScript data={createJsonLd(graph)} />;
}
