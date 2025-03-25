import React from "react";
import parse, { attributesToProps, domToReact } from "html-react-parser";
import { Text } from "./text.component";

export const RichText = ({ text = "", classnames, level }) => {
  if (!text) {
    return null;
  }

  const options = {
    replace({ attribs, children, name }) {
      if (name === "h1") {
        const props = attributesToProps(attribs);
        return (
          <Text
            {...props}
            as="h1"
            level="4xl"
            classnames={`${classnames} mb-2`}
          >
            {domToReact(children, options)}
          </Text>
        );
      }
      if (name === "h2") {
        const props = attributesToProps(attribs);
        return (
          <Text
            {...props}
            as="h2"
            level="3xl"
            classnames={`${classnames} mb-2`}
          >
            {domToReact(children, options)}
          </Text>
        );
      }
      if (name === "h3") {
        const props = attributesToProps(attribs);
        return (
          <Text
            {...props}
            as="h3"
            level="2xl"
            classnames={`${classnames} mb-2`}
          >
            {domToReact(children, options)}
          </Text>
        );
      }
      if (name === "h4") {
        const props = attributesToProps(attribs);
        return (
          <Text {...props} as="h4" level="xl" classnames={`${classnames} mb-2`}>
            {domToReact(children, options)}
          </Text>
        );
      }
      if (name === "h5") {
        const props = attributesToProps(attribs);
        return (
          <Text {...props} as="h5" level="l" classnames={`${classnames} mb-2`}>
            {domToReact(children, options)}
          </Text>
        );
      }
      if (name === "h6") {
        const props = attributesToProps(attribs);
        return (
          <Text {...props} as="h6" level="md" classnames={`${classnames} mb-2`}>
            {domToReact(children, options)}
          </Text>
        );
      }
      if (name === "p") {
        const props = attributesToProps(attribs);
        return (
          <Text {...props} level={level} classnames={`${classnames} mb-2`}>
            {domToReact(children, options)}
          </Text>
        );
      }

      if (name === "strong") {
        return (
          <span className="font-bold">{domToReact(children, options)}</span>
        );
      }

      if (name === "ul") {
        return (
          <ul role="list" className={`${classnames} mt-8 space-y-3 list-disc`}>
            {domToReact(children, options)}
          </ul>
        );
      }

      if (name === "ol") {
        return (
          <ol
            role="list"
            className={`${classnames} mt-8 space-y-3 list-decimal`}
          >
            {domToReact(children, options)}
          </ol>
        );
      }

      if (name === "li") {
        return (
          <li className="gap-x-3 ml-5">
            <Text level={level}>{domToReact(children, options)}</Text>
          </li>
        );
      }

      if (name === "a") {
        return (
          <a
            href={attribs.href}
            target={attribs?.target ? attribs.target : "_self"}
            className=" cursor-pointer"
          >
            <span className="relative underline decoration-accent-500">
              {domToReact(children, options)}
            </span>
          </a>
        );
      }
    },
  };

  return parse(text, options);
};
