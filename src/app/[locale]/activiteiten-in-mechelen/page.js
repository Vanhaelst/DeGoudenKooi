import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";
import { defaultMetadata } from "@/data/metadata";

async function getPage({ language }) {
  return fetchData(PageQuery({ page: "dealsActiviteitenEntries", language }));
}

export async function generateMetadata({ params }) {
  return params.locale === "en"
    ? {
        ...defaultMetadata,
        title: "Activities in Mechelen - De Gouden Kooi",
        description:
          "Combine your escape room with fun activities in Mechelen? We selected a few nice addresses for you, with an exclusive advantage!",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Combine your escape room with fun activities in Mechelen? We selected a few nice addresses for you, with an exclusive advantage!",
        },
      }
    : {
        ...defaultMetadata,
        title: "Activiteiten in Mechelen - De Gouden Kooi",
        description:
          "Je escape room combineren met leuke activiteiten in Mechelen? We selecteerden een paar leuke adresjes voor je, met een exclusief voordeel!",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Je escape room combineren met leuke activiteiten in Mechelen? We selecteerden een paar leuke adresjes voor je, met een exclusief voordeel!",
        },
      };
}

export default async function Home({ params }) {
  const { page } = await getPage({ language: params.locale });

  const sections = page[0]?.sections;

  return sections?.map((section) => renderComponents(section, params.locale));
}
