//          <div className="container px-4  ">

export const Container = ({
  size,
  classnames,
  children,
  style,
  forwardRef,
}) => {
  const getSize = () => {
    switch (size) {
      case "xs":
        return "container px-6 lg:px-8 max-w-xl lg:max-w-3xl";
      case "s":
        return "container px-6 lg:px-8 max-w-xl lg:max-w-5xl";
      case "md":
        return "container px-4";
      case "lg":
        return "container px-6 lg:px-8";
      default:
        return "container px-6 lg:px-8 lg:max-w-6xl";
    }
  };

  return (
    <div
      ref={forwardRef}
      className={`relative mx-auto ${getSize()} ${classnames}`}
      style={style}
    >
      {children}
    </div>
  );
};
