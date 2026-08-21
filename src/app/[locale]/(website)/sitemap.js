export default async function sitemap() {
  const getProducts = async () => {
    const productRes = await fetch(
      process.env.CMS_HOST +
        "/api/producten?sort=rank:ASC&populate=*&locale=nl-BE",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        cache: "no-store",
      },
    );
    const products = await productRes.json();
    return products.data;
  };
  const getCases = async () => {
    const casesRes = await fetch(
      process.env.CMS_HOST + "/api/cases?populate=*&locale=nl-BE",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        cache: "no-store",
      },
    );

    const cases = await casesRes.json();
    return cases.data;
  };

  return [
    {
      url: "https://loadingequipment.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      alternates: {
        languages: {
          nl: "https://loadingequipment.com/",
          fr: "https://loadingequipment.com/fr",
        },
      },
    },
    {
      url: "https://loadingequipment.com/service",
      lastModified: new Date(),
      changeFrequency: "monthly",
      alternates: {
        languages: {
          nl: "https://loadingequipment.com/service",
          fr: "https://loadingequipment.com/fr/service",
        },
      },
    },
    {
      url: "https://loadingequipment.com/veiligheid",
      lastModified: new Date(),
      changeFrequency: "monthly",
      alternates: {
        languages: {
          nl: "https://loadingequipment.com/veiligheid",
          fr: "https://loadingequipment.com/fr/securite",
        },
      },
    },
    {
      url: "https://loadingequipment.com/producten",
      lastModified: new Date(),
      changeFrequency: "monthly",
      alternates: {
        languages: {
          nl: "https://loadingequipment.com/producten",
          fr: "https://loadingequipment.com/fr/produits",
        },
      },
    },
    {
      url: "https://loadingequipment.com/toepassingen",
      lastModified: new Date(),
      changeFrequency: "monthly",
      alternates: {
        languages: {
          nl: "https://loadingequipment.com/toepassingen",
          fr: "https://loadingequipment.com/fr/applications",
        },
      },
    },
    {
      url: "https://loadingequipment.com/over-ons",
      lastModified: new Date(),
      changeFrequency: "monthly",
      alternates: {
        languages: {
          nl: "https://loadingequipment.com/over-ons",
          fr: "https://loadingequipment.com/fr/a-propos-de-nous",
        },
      },
    },
    {
      url: "https://loadingequipment.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      alternates: {
        languages: {
          nl: "https://loadingequipment.com/contact",
          fr: "https://loadingequipment.com/fr/contact",
        },
      },
    },
    ...(await getProducts()).map((o) => ({
      url: `https://loadingequipment.com/producten/${o.attributes.slug}`,
      lastModified: o.attributes.updatedAt,
      changeFrequency: "monthly",
      alternates: {
        languages: {
          nl: `https://loadingequipment.com/producten/${o.attributes.slug}`,
          fr: `https://loadingequipment.com/fr/produits/${o.attributes?.localizations?.data[0]?.attributes?.slug}`,
        },
      },
    })),
    ...(await getCases()).map((o) => ({
      url: `https://loadingequipment.com/toepassingen/${o.attributes.slug}`,
      lastModified: o.attributes.updatedAt,
      changeFrequency: "monthly",
      alternates: {
        languages: {
          nl: `https://loadingequipment.com/toepassingen/${o.attributes.slug}`,
          fr: `https://loadingequipment.com/fr/applications/${o.attributes?.localizations?.data[0]?.attributes?.slug}`,
        },
      },
    })),
  ];
}
