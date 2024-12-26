import { NewspaperIcon } from "@heroicons/react/24/outline";
import { LINKS } from "@/enums/links";

export const MegaMenuItem = ({ label, queryparams, prefix, subItems }) => {
  return (
    <div>
      <a
        href={`${LINKS.GAME_OVERVIEW}${queryparams}`}
        className="relative text-sm font-medium leading-6 text-gray-500"
      >
        {label}
      </a>
      <div className="mt-6">
        <div className="my-2">
          {subItems?.map((item = {}) => (
            <a
              key={item.title}
              href={`/${item.slug}`}
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
