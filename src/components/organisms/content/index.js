import { renderComponents } from "@/utils/renderComponents";
import { getBackgroundColor } from "@/utils/getBackgroundColor";

export const Contents = ({ contentItem, backgroundColor }) => {
  const bgColor = getBackgroundColor(backgroundColor);

  return (
    <div className={`${bgColor} py-24 sm:py-32 space-y-8 md:space-y-16`}>
      {contentItem?.map((section) => renderComponents(section))}{" "}
    </div>
  );
};
