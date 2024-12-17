import React from "react";
import { Footer, MegaMenu, TopBar } from "@/components/organisms";
import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";

async function getPage() {
  return fetchData(PageQuery({ page: "aboutUsEntries" }));
}

export default async function Home() {
  const { page } = await getPage();

  const sections = page[0]?.sections;

  return (
    <div>
      <TopBar />
      <MegaMenu />

      {sections?.map((section) => renderComponents(section))}

      <Footer />
    </div>
  );
}
