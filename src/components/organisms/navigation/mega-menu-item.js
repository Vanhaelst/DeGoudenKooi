import { NewspaperIcon } from "@heroicons/react/24/outline";

export const MegaMenuItem = ({ label, subItems }) => {
  return (
    <div>
      <h3 className="relative text-sm font-medium leading-6 text-gray-500">
        {label}
      </h3>
      <div className="mt-6">
        <div className="my-2">
          {subItems?.map((item = {}) => (
            <a
              key={item.title}
              href={item.slug}
              className="relative flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
            >
              <NewspaperIcon
                aria-hidden="true"
                className="h-6 w-6 flex-none text-gray-400"
              />
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
