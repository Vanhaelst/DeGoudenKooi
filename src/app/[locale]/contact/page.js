import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";
import Newsletter from "@/components/molecules/newsletter/newsletter";

async function getPage({ language }) {
  return fetchData(PageQuery({ page: "contactEntries", language }));
}

export default async function Contact({ params }) {
  const { page } = await getPage({ language: params.locale });

  const sections = page[0]?.sections;

  return (
    <>
      {sections?.map((section) => renderComponents(section, params.locale))}
      <Newsletter locale={params.locale} />
    </>
  );
}
