import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { RichText, Text } from "@/components/atoms";

export default function Warning({ title, description, classnames }) {
  return (
    <div
      className={`rounded-md bg-yellow-50 p-4 ${classnames} max-w-[450px] transition-all`}
    >
      <div className="flex">
        <div className="shrink-0">
          <ExclamationTriangleIcon
            aria-hidden="true"
            className="size-5 text-yellow-400"
          />
        </div>
        <div className="ml-3">
          {title && (
            <Text level="p" as="h3" classnames="font-medium text-yellow-800">
              {title}
            </Text>
          )}
          {description && (
            <div className="text-sm text-yellow-700">
              <RichText text={description} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
