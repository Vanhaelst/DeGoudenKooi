import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";

async function getPage({ language }) {
  return fetchData(PageQuery({ page: "persEntries", language }));
}

export default async function Home({ params }) {
  const { page } = await getPage({ langauge: params.locale });

  const sections = page[0]?.sections;

  return sections?.map((section) => renderComponents(section, params.locale));
}
