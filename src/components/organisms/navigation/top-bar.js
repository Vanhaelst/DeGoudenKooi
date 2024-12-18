import NavigationTopItem from "@/components/organisms/navigation/NavigationTopItem";
import { LINKS } from "@/enums/links";

export const topNavigation = [
  {
    name: "Awards",
    href: LINKS.AWARDS,
  },
  {
    name: "Nieuws",
    href: LINKS.NEWS,
  },
  {
    name: "Cadeaubon",
    href: LINKS.GIFTCARD,
  },
  {
    name: "FAQ",
    href: LINKS.FAQ,
  },
];

export const TopBar = () => {
  return (
    <>
      <div className="bg-white z-50 w-full border-b text-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-0">
          <div className="flex items-center justify-end gap-x-6 px-6 py-2.5 sm:pr-3.5 lg:pl-8 mr-4">
            {topNavigation.map((item) => {
              return <NavigationTopItem key={item.name} item={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
