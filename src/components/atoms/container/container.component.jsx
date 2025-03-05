//          <div className="container px-4  ">

export const Container = ({ size, classnames, children }) => {
  const getSize = () => {
    switch (size) {
      case "s":
        return "container px-6 lg:px-8 max-w-xl lg:max-w-5xl";
      case "md":
        return "container px-4";
      case "lg":
        return "container px-6 lg:px-8";
      default:
        return "container px-6 lg:px-8 max-w-2xl lg:max-w-6xl";
    }
  };

  return (
    <div className={`relative mx-auto ${getSize()} ${classnames}`}>
      {children}
    </div>
  );
};
