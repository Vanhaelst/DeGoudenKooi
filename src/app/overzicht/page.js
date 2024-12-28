import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";
import { Text } from "@/components/atoms";

async function getPage() {
  return fetchData(PageQuery({ page: "gerechtstraatEntries" }));
}

const games = [
  {
    src: "https://triptrapescape.ch/wp-content/uploads/2021/04/mini-logo-tresor-rackham.png",
    name: "Jack Rackhams treasure",
  },
  {
    src: "https://triptrapescape.ch/wp-content/uploads/2021/04/mini-logo-confrerie-de-la-pierre.png",
    name: "The Brotherhood of the Stone",
  },
  {
    src: "https://triptrapescape.ch/wp-content/uploads/2021/05/jeu-revanche-rackham-badge-1.png",
    name: "The Chest Rackham's Revenge",
  },
  {
    src: "https://triptrapescape.ch/wp-content/uploads/2021/05/mini_picto_tante_hilda.png",
    name: "Aunt Hilda's Room",
  },
  {
    src: "https://triptrapescape.ch/wp-content/uploads/2021/04/mini-logo-confrerie-de-la-pierre.png",
    name: "The Brotherhood of the Stone",
  },
  {
    src: "https://triptrapescape.ch/wp-content/uploads/2021/05/jeu-revanche-rackham-badge-1.png",
    name: "The Chest Rackham's Revenge",
  },
];
export default async function Home({ searchParams }) {
  const { page } = await getPage();

  const sections = page[0]?.sections;

  const bgColor = "bg-lightGray-500";
  return (
    <>
      <section className={`${bgColor} pt-24 pb-0`}>
        <div className="badges w-full flex justify-center">
          <div className="flex overflow-x-scroll space-x-5 hide-scrollbar px-10">
            {games.map(({ src, name, isNew }, index) => (
              <a
                key={name}
                href="https://triptrapescape.ch/en/game/jack-rackhams-treasure/"
                className="w-48 min-w-48 flex flex-col items-center grayscale hover:grayscale-0 duration-200"
              >
                <img src={src} alt={name} className="px-8 mb-2" />
                <Text as="p" level="sm" classnames="text-center">
                  {name}
                </Text>
              </a>
            ))}
          </div>
        </div>
      </section>
      {sections?.map((section) => renderComponents(section))}
    </>
  );
}
