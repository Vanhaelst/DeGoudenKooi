import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";
import { defaultMetadata } from "@/data/metadata";

async function getPage({ language }) {
  return fetchData(PageQuery({ page: "jobsEntries", language }));
}

export async function generateMetadata({ params }) {
  return params.locale === "en"
    ? {
        ...defaultMetadata,
        title: "Hotels in Mechelen - De Gouden Kooi",
        description:
          "Hotels in Mechelen ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Hotels in Mechelen ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        },
      }
    : {
        ...defaultMetadata,
        title: "Hotels in Mechelen - De Gouden Kooi",
        description:
          "Voor of na je escape room nog een hapje gaan eten? Bij De Gouden Kooi selecteerden we een paar leuke adresjes voor je, met een exclusief voordeel!",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Voor of na je escape room nog een hapje gaan eten? Bij De Gouden Kooi selecteerden we een paar leuke adresjes voor je, met een exclusief voordeel!",
        },
      };
}

export default async function Home({ params }) {
  const { page } = await getPage({ language: params.locale });

  const sections = page[0]?.sections;

  return sections?.map((section) => renderComponents(section, params.locale));
}