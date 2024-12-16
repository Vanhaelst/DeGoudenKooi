import { AccordionItem } from "@/components/molecules/accordeon/accordeonItem";

export const Accordion = ({ items }) => {
  return items?.map((item, index) => <AccordionItem key={index} {...item} />);
};
