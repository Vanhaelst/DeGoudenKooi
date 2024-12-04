import { Text } from "@/components/atoms";

// TODO: include avatar
export const ReviewCard = ({ title, description, avatar }) => {
  return (
    <div className="border-none rounded-xl bg-white shadow-lg px-5 py-3 flex w-fit">
      <div className="bg-primary-500 h-11 aspect-square mr-2" />
      <div>
        <Text as={"h5"} level="h5" classnames="text-secondary-500">
          {title}
        </Text>
        <Text as={"p"} level="p" classnames="text-secondary-500">
          {description}
        </Text>
      </div>
    </div>
  );
};
