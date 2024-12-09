import { Text } from "@/components/atoms";
import React from "react";

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
        <Text as="p" level="md" classnames="text-primary-700">
          {description}
        </Text>
      </div>
    </div>
  );
};
