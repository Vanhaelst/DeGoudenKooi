import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";
import Newsletter from "@/components/molecules/newsletter/newsletter";
import { defaultMetadata } from "@/data/metadata";
import { getDictionary } from "@/app/[locale]/dictionaries";

async function getPage({ language }) {
  return fetchData(PageQuery({ page: "contactEntries", language }));
}

export async function generateMetadata({ params }) {
  return params.locale === "en"
    ? {
        ...defaultMetadata,
        title: "Contact - De Gouden Kooi",
        description:
          "Contact ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Contact ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        },
      }
    : {
        ...defaultMetadata,
        title: "Contact - De Gouden Kooi",
        description:
          "Contact ✓ Escape rooms ✓ Een teamactiviteit voor gezinnen, vrienden en collega's ✓ Twee locaties in centrum Mechelen ✓ Pioniers in België.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Contact ✓ Escape rooms ✓ Een teamactiviteit voor gezinnen, vrienden en collega's ✓ Twee locaties in centrum Mechelen ✓ Pioniers in België.",
        },
      };
}

export default async function Contact({ params }) {
  const { page } = await getPage({ language: params.locale });
  const dict = await getDictionary(params.locale);

  const sections = page[0]?.sections;

  return (
    <>
      {sections?.map((section) => renderComponents(section, params.locale))}

      <Newsletter locale={params.locale} t={dict} />
    </>
  );
}
