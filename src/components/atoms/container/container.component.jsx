//          <div className="container px-4  ">

export const Container = ({ size = "md", classnames, children }) => {
  const getSize = () => {
    switch (size) {
      case "s":
        return "container px-4 md:px-[4%] lg:px-[8%]";
      case "md":
        return "container px-4";
      case "lg":
        return "px-4";
      default:
        return "";
    }
  };

  return (
    <div className={`relative mx-auto ${getSize()} ${classnames}`}>
      {children}
    </div>
  );
};
