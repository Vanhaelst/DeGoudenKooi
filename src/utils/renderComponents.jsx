import React from "react";
import FileGroup from "@/components/fileGroup/fileGroup.component";
import Tabs from "@/components/tabs/tabs.component";

export const renderComponents = (data) => {
  const { groupType } = data ?? {};

  switch (groupType) {
    case "fileGroup":
      return <FileGroup key={data.id} {...data} />;
    case "tabs":
      return <Tabs key={data.id} {...data} />;
    default:
      return null;
  }
};
