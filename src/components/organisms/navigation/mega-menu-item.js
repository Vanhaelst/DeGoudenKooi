import { NewspaperIcon } from "@heroicons/react/24/outline";
import { LINKS } from "@/enums/links";
import Image from "next/image";

export const MegaMenuItem = ({ locale, label, queryparams, subItems }) => {
  return (
    <div>
      <a
        href={`${LINKS[locale.toUpperCase()].GAME_OVERVIEW}${queryparams}`}
        className="relative flex text-md font-bold leading-6 text-secondary-500 hover:underline hover:pl-2 transition-all"
      >
        {label}
      </a>
      <div className="mt-6">
        <div className="my-2">
          {subItems?.map((item = {}) => (
            <a
              key={item.title}
              href={`/${locale}/${item.slug}`}
              className="relative flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900 cursor-pointer hover:underline hover:pl-2 transition-all"
            >
              {item.icon?.[0] ? (
                <Image
                  src={item.icon[0].url}
                  width={item.icon[0].width}
                  height={item.icon[0].height}
                  className="h-6 w-6 flex-none text-gray-400"
                />
              ) : (
                <NewspaperIcon
                  aria-hidden="true"
                  className="h-6 w-6 flex-none text-gray-400"
                />
              )}

              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
