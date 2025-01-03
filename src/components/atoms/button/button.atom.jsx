import React from "react";
import Link from "next/link";

export const Button = ({
  callToAction,
  variant = "primary",
  type,
  size,
  href,
  fullWidth,
  buttonType,
  onClick,
  classnames = "",
}) => {
  const getVariant = () => {
    switch (variant) {
      case "primary":
        return "border border-primary-500 bg-primary-500 hover:bg-primary-700 active:bg-primary-900";
      case "secondary":
        return "border border-secondary-500 bg-secondary-500 hover:bg-secondary-700 active:bg-secondary-900";
      case "primary-outline":
        return "border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white active:bg-primary-700";
      case "secondary-outline":
        return "border border-secondary-500 text-secondary-500 hover:bg-secondary-500 hover:text-white active:bg-secondary-700";
      case "white-outline":
        return "border border-white text-white hover:bg-white hover:text-primary-500";
      case "white":
        return "border bg-white text-secondary-500 hover:text-primary-500";
    }
  };

  const getFont = () => {
    switch (variant) {
      case "primary":
      case "secondary":
      case "accent":
        return "text-white font-semibold";
      case "primary-outline":
      case "secondary-outline":
      case "white":
        return "font-semibold";
      default:
        return "";
    }
  };

  const getType = () => {
    switch (type) {
      case "square":
        return "rounded-none";
      case "rounded":
        return "rounded-full";
      default:
        return "rounded-xl";
    }
  };

  const buttonSize = () => {
    switch (size) {
      case "small":
        return "py-2 px-4 text-xs";
      case "large":
        return " px-12 py-4 text-sm md:text-base";
      default:
        return "py-2 px-6";
    }
  };

  const hrefType = () => {
    switch (buttonType) {
      case "internal":
        return {
          target: "_self",
          url: href,
        };
      case "external":
        return {
          target: "_blank",
          url: href,
        };
      case "phone":
        return {
          target: "_blank",
          url: `tel:${href}`,
        };
      case "eMail":
        return {
          target: "",
          url: `mailto:${href}`,
        };
      default:
        return {
          target: "_self",
          url: href || "#",
        };
    }
  };

  const foo = hrefType();

  if (!callToAction) {
    return null;
  }
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`
            ${classnames}
          ${getVariant()} ${getFont()} ${getType()} ${buttonSize()} 
          ${fullWidth ? "w-full" : ""}
        cursor-pointer hover:scale-110 transition-all
        `}
      >
        {callToAction}
      </button>
    );
  }

  return (
    <a
      href={foo.url}
      className={`${fullWidth ? "w-full" : ""} `}
      target={foo.target}
    >
      <button
        className={`
            ${classnames}
          ${getVariant()} ${getFont()} ${getType()} ${buttonSize()} 
          ${fullWidth ? "w-full" : ""}
        cursor-pointer hover:scale-110 transition-all
        `}
      >
        {callToAction}
      </button>
    </a>
  );
};
