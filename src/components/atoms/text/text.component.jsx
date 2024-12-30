export const Text = ({ as, level, classnames = "", children }) => {
  const getLevel = () => {
    switch (level) {
      case "xxs":
        return "text-[10px] md:text-xs";
      case "xs":
        return "text-xs md:text-s";
      case "s":
      case "sm":
        return "text-s md:text-md";
      case "base":
        return "text-sm md:text-base";
      case "md":
        return "text-md md:text-lg";
      case "lg":
        return "text-lg md:text-xl";
      case "xl":
        return "text-xl text-2xl";
      case "2xl":
        return "text-2xl md:text-3xl";
      case "3xl":
        return "text-3xl md:text-4xl xl:text-5xl";
      case "4xl":
        return "text-4xl md:text-5xl xl:text-6xl";
      default:
        return "";
    }
  };

  const titleClass = `${getLevel()} ${classnames} leading-tight md:leading-tight xl:leading-tight font-bold`;
  const textClass = `${getLevel()} ${classnames} font-light leading-normal`;

  const getTag = () => {
    switch (as) {
      case "h1":
        return <h1 className={titleClass}>{children}</h1>;
      case "h2":
        return <h2 className={titleClass}>{children}</h2>;
      case "h3":
        return <h3 className={titleClass}>{children}</h3>;
      case "h4":
        return <h4 className={titleClass}>{children}</h4>;
      case "h5":
        return <h5 className={titleClass}>{children}</h5>;
      case "h6":
        return <h6 className={titleClass}>{children}</h6>;
      case "span":
        return (
          <span className={`${getLevel()} ${classnames}`}>{children}</span>
        );
      case "li":
        return (
          <li
            className={`${getLevel()} ${classnames} list-disc list-outside ml-5`}
          >
            {children}
          </li>
        );
      default:
        return <p className={textClass}>{children}</p>;
    }
  };

  return getTag();
};
