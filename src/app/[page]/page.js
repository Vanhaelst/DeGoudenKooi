"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";

import { SeoQuery } from "@/queries/sections/seoPage";

import { usePathname } from "next/navigation";
import { Loader } from "@/components/atoms/loader/loader";
import { renderComponents } from "@/utils/renderComponents";

export default function Page() {
  const [data, setData] = useState(undefined);
  const pathname = usePathname();

  useEffect(() => {
    fetchData(SeoQuery({ url: pathname })).then((res) => {
      setData(res.page[0]);
    });
  }, [pathname]);

  if (!data) {
    return <Loader />;
  }

  return data?.map((section) => renderComponents(section));
}
