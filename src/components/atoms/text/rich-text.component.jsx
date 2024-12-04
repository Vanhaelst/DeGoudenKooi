"use client";
import Link from "next/link";
import { Text } from "./text.component";

export const RichText = ({ content, classnames }) => {
  return null;
  /*(
    <HygraphRichText
      content={content}
      renderers={{
        h1: ({ children }) => (
          <Text as="h1" level="4xl" classnames={classnames}>
            {children}
          </Text>
        ),
        h2: ({ children }) => (
          <Text as="h2" level="3xl" classnames={classnames}>
            {children}
          </Text>
        ),
        h3: ({ children }) => (
          <Text as="h3" level="2xl" classnames={classnames}>
            {children}
          </Text>
        ),
        h4: ({ children }) => (
          <Text as="h4" level="xl" classnames={classnames}>
            {children}
          </Text>
        ),
        h5: ({ children }) => (
          <Text as="h5" level="lg" classnames={classnames}>
            {children}
          </Text>
        ),
        h6: ({ children }) => (
          <Text as="h6" level="md" classnames={classnames}>
            {children}
          </Text>
        ),
        p: ({ children }) => (
          <Text as="p" level="md" classnames={classnames}>
            {children}
          </Text>
        ),
        li: ({ children }) => (
          <li>
            <Text as="span" level="md" className={classnames}>
              {children}
            </Text>
          </li>
        ),
        ul: ({ children }) => (
          <ul className={`list-outside ml-5 mt-3 list-disc ${classnames}`}>
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className={`list-decimal list-outside ml-5 mt-3 ${classnames}`}>
            {children}
          </ol>
        ),
        a: ({ children, openInNewTab, href, rel, ...rest }) => {
          if (href?.match(/^https?:\/\/|^\/\//i)) {
            return (
              <a
                href={href}
                className="hover:underline"
                target={openInNewTab ? "_blank" : "_self"}
                rel={rel || "noopener noreferrer"}
                {...rest}
              >
                {children}
              </a>
            );
          }

          return (
            <Link href={href} classnames="hover:underline">
              {children}
            </Link>
          );
        },
      }}
    />
  ); */
};
