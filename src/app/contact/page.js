import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";

async function getPage() {
  return fetchData(PageQuery({ page: "contactEntries" }));
}

export default async function Home() {
  const { page } = await getPage();

  const sections = page[0]?.sections;

  return sections?.map((section) => renderComponents(section));
}
