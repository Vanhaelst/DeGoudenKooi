import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";

export const metadata = {
  title: "Faq - De Gouden Kooi",
  description: "",
  // keywords: "",
};

async function getPage({ language }) {
  return fetchData(PageQuery({ page: "faqPageEntries", language }));
}

export default async function Home({ params }) {
  const { page } = await getPage({ language: params.locale });

  const sections = page[0]?.sections;

  return sections?.map((section) => renderComponents(section));
}
