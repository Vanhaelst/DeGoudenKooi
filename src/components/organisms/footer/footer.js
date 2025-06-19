import { Text } from "@/components/atoms";
import Image from "next/image";
import { CompanyData } from "@/data/companyData";
import { LINKS } from "@/enums/links";
import { getDictionary } from "@/app/[locale]/dictionaries";
import ImageWithFallback from "@/utils/Image";
import Link from "next/link";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";

async function getRooms({ language }) {
  return fetchData(roomsQuery({ language }));
}

export const Footer = async ({ locale = "nl" }) => {
  const dict = await getDictionary(locale);
  const { rooms } = await getRooms({ language: locale });

  const navigation = {
    navigation: [
      { name: dict.navigation.about, href: LINKS[locale.toUpperCase()].ABOUT },
      {
        name: dict.navigation.contact,
        href: LINKS[locale.toUpperCase()].CONTACT,
      },
      { name: dict.navigation.pers, href: LINKS[locale.toUpperCase()].PERS },
      { name: "+32 15 67 68 67", href: "tel:+3215676867" },
    ],
    discover: [
      {
        name: dict.topbar.awards,
        href: LINKS[locale.toUpperCase()].AWARDS,
      },
      {
        name: dict.navigation.activity_deals,
        href: LINKS[locale.toUpperCase()].ACTIVITY_DEALS,
      },
      {
        name: dict.navigation.hotel_deals,
        href: LINKS[locale.toUpperCase()].HOTEL_DEALS,
      },
      {
        name: dict.navigation.restaurant_deals,
        href: LINKS[locale.toUpperCase()].RESTAURANT_DEALS,
      },
    ],
    questions: [
      { name: dict.topbar.blog, href: LINKS[locale.toUpperCase()].BLOG },
      locale === "nl"
        ? { name: dict.topbar.news, href: LINKS[locale.toUpperCase()].NEWS }
        : null,
      { name: dict.topbar.faq, href: LINKS[locale.toUpperCase()].FAQ },
      { name: dict.topbar.privacy, href: LINKS[locale.toUpperCase()].PRIVACY },
      locale === "nl"
        ? { name: dict.topbar.jobs, href: LINKS[locale.toUpperCase()].JOBS }
        : null,
      {
        name: dict.navigation.general_conditions,
        target: "_blank",
        href: "https://degoudenkooi.pluxit.be/web/assets/Algemene-voorwaarden-De-Gouden-Kooi.pdf",
      },
    ],
    adventures: rooms.map((room) => ({ name: room.title, href: room.slug })),
    social: [
      {
        name: "LinkedIn",
        href: CompanyData.socials.linkedin,
        icon: (props) => (
          <svg
            fill="ffffff"
            version="1.1"
            viewBox="0 0 310 310"
            className="w-4 h-4"
            {...props}
          >
            <path
              d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73
		C77.16,101.969,74.922,99.73,72.16,99.73z"
            />
            <path
              d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4
		c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z"
            />
            <path
              d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599
		c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319
		c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995
		C310,145.43,300.549,94.761,230.454,94.761z"
            />
          </svg>
        ),
      },
      {
        name: "Facebook",
        href: CompanyData.socials.facebook,
        icon: (props) => (
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-4 h-4"
            {...props}
          >
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: "TikTok",
        href: CompanyData.socials.tiktok,
        icon: (props) => (
          <svg fill="#ffffff" viewBox="0 0 512 512" {...props}>
            <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z" />
          </svg>
        ),
      },
      {
        name: "Instagram",
        href: CompanyData.socials.instagram,
        icon: (props) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: "Youtube",
        href: CompanyData.socials.youtube,
        icon: (props) => (
          <svg viewBox="0 0 461.001 461.001" {...props}>
            <path
              d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
		c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
		C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
		c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
            />
          </svg>
        ),
      },
    ],
  };

  return (
    <>
      <footer className="relative bg-secondary-700 pt-10">
        <Image
          src="/scheur-footer-top.png"
          alt="scheur"
          width={1459}
          height={60}
          className="w-full absolute object-cover h-16 -top-16"
        />
        <div className="mx-auto max-w-7xl px-6 pb-32 mb:pb-8 pt-20 sm:pt-20 lg:px-8 xl:pt-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
            <div>
              <Image
                width={121}
                height={18}
                src={CompanyData.logo}
                alt={CompanyData.name}
                className="h-6 w-auto"
              />
              <ul role="list" className="mt-6 space-y-2">
                {navigation.navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-white hover:underline hover:pl-2 transition-all"
                    >
                      {item.name.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 md:mt-0">
              <Text as="h3" level="xl" classnames="font-semibold text-white">
                {dict.general.discover}
              </Text>
              <ul role="list" className="mt-6 space-y-2">
                {navigation.discover.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-white hover:underline hover:pl-2 transition-all"
                    >
                      {item.name.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Text as="h3" level="xl" classnames="font-semibold text-white">
                {dict.general.questions}
              </Text>
              <ul role="list" className="mt-6 space-y-2">
                {navigation.questions.map((item) => {
                  if (!item) {
                    return null;
                  }
                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target={item.target ? item.target : "_self"}
                        className="text-sm text-white hover:underline hover:pl-2 transition-all"
                      >
                        {item.name.toUpperCase()}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <Text as="h3" level="xl" classnames="font-semibold text-white">
                {dict.navigation.adventures}
              </Text>
              <ul role="list" className="mt-6 space-y-2">
                {navigation.adventures.map((item) => (
                  <li key={item.name}>
                    <a
                      href={`/${item.href}`}
                      className="text-sm text-white hover:underline hover:pl-2 transition-all"
                    >
                      {item.name.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 md:mt-0 ">
              <div className="flex justify-center items-center bg-white/10 aspect-square rounded-2xl overflow-hidden w-32 h-40">
                <a
                  href={`/${locale}/nieuws/federatie-escape-rooms-befeb-de-gouden-kooi-staat-mee-aan-de-wieg`}
                >
                  <ImageWithFallback
                    // src="https://befeb.be/images/member-badge/BEFEB-member_white.png"
                    src="https://befeb.be/images/member-badge/BEFEB-member_trans.png"
                    fallbackImage="/befeb.webp"
                    alt="befeb"
                    width={236}
                    height={300}
                    className=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-6 flex flex-col-reverse md:flex-row md:items-center md:justify-between lg:mt-10 ">
            <Text as="p" level="xs" classnames="text-white">
              &copy; {new Date().getFullYear()} De Gouden Kooi |{" "}
              <a
                href="https://www.publiplus.be"
                target="_blank"
                className="hover:underline"
              >
                Publiplus
              </a>
            </Text>

            <div className="flex gap-x-6 md:order-2 mb-4 md:mb-0">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="transition-all"
                  target="_blank"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon
                    aria-hidden="true"
                    className="size-6 fill-white hover:fill-primary-500 "
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
