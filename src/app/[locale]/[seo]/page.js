import { redirect } from "next/navigation";
import { fetchData } from "@/utils/fetchData";
import { renderComponents } from "@/utils/renderComponents";
import { SeoQuery } from "@/queries/sections/seoPage";

async function getPage({ language, url }) {
  return fetchData(SeoQuery({ url, language }));
}

export default async function Home({ params }) {
  const { page } = await getPage({ language: params.locale, url: params.seo });

  const sections = page[0]?.sections;

  if (page.length === 0) {
    redirect(`/${params.locale}/not-found`);
  }
  return sections?.map((section) => renderComponents(section, params.locale));
}
