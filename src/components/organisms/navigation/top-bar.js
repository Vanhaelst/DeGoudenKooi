import NavigationTopItem from "@/components/organisms/navigation/NavigationTopItem";
import { LINKS } from "@/enums/links";
import { LanguageSwitch } from "@/components/organisms/navigation/languageSwitch";
import { getDictionary } from "@/app/[locale]/dictionaries";

export const TopBar = async ({ locale = "nl" }) => {
  const dict = await getDictionary(locale);

  const topNavigation = [
    {
      name: dict.navigation.about,
      href: LINKS[locale.toUpperCase()].ABOUT,
    },
    {
      name: dict.topbar.awards,
      href: LINKS[locale.toUpperCase()].AWARDS,
    },
    locale === "nl"
      ? {
          name: dict.topbar.news,
          href: LINKS[locale.toUpperCase()].NEWS,
        }
      : null,
    {
      name: dict.topbar.blog,
      href: LINKS[locale.toUpperCase()].BLOG,
    },
  ];

  return (
    <div className="hidden lg:block fixed top-0 w-full bg-primary-500 z-50 border-b text-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-0">
        <div className="flex items-center justify-end gap-x-6 px-6 py-2 sm:pr-3.5 lg:pl-8 mr-4">
          {topNavigation.map((item) => {
            if (!item) {
              return null;
            }

            return <NavigationTopItem key={item.name} item={item} />;
          })}
          <LanguageSwitch locale={locale} />
        </div>
      </div>
    </div>
  );
};
