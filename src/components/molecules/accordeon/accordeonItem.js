import React from "react";
import { RichText, Text } from "@/components/atoms";

export const AccordionItem = ({ title, description }) => {
  return (
    <div className="collapse collapse-plus">
      <input type="radio" name="my-accordion-3" defaultChecked />
      <div className="collapse-title">
        <Text as="p" level="md" classnames="font-semibold text-primary-700">
          {title}
        </Text>
      </div>
      <div className="collapse-content">
        <RichText text={description} level="md" classnames="text-primary-700" />
      </div>
    </div>
  );
};
