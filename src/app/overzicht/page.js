import { fetchData } from "@/utils/fetchData";
import { PageQuery } from "@/queries/sections/page";
import { renderComponents } from "@/utils/renderComponents";
import { Button, Container, Text } from "@/components/atoms";
import { LOCATIONS } from "@/enums/locations";

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
    src: "https://triptrapescape.ch/wp-content/uploads/2021/05/jeu-piege-lotus-badge.png",
    name: "The Lotus Trap",
  },
  {
    src: "https://triptrapescape.ch/wp-content/uploads/2024/05/jeu-testament-antiquaire-badge.png",
    name: "The Antiquary’s Heritage",
  },
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
    isNew: true,
  },
  {
    src: "https://triptrapescape.ch/wp-content/uploads/2021/05/mini_picto_tante_hilda.png",
    name: "Aunt Hilda's Room",
  },
  {
    src: "https://triptrapescape.ch/wp-content/uploads/2021/05/jeu-piege-lotus-badge.png",
    name: "The Lotus Trap",
  },
  {
    src: "https://triptrapescape.ch/wp-content/uploads/2024/05/jeu-testament-antiquaire-badge.png",
    name: "The Antiquary’s Heritage",
  },
];
export default async function Home({ searchParams }) {
  const { page } = await getPage();

  const sections = page[0]?.sections;

  const bgColor = "bg-lightGray-500";
  return (
    <>
      {" "}
      <section className={`${bgColor} py-24 sm:py-32`}>
        <div className="badges">
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

          <Container classnames="flex flex-row justify-center pt-20">
            <span className="isolate inline-flex rounded-md shadow-sm">
              <Button
                variant="primary-outline"
                type="square"
                size="medium"
                classnames="rounded-l-md"
                callToAction={LOCATIONS.All}
              />
              <Button
                variant="primary"
                type="square"
                size="medium"
                classnames="border-x-0"
                callToAction={LOCATIONS.HAVERWERF}
              />
              <Button
                variant="primary-outline"
                type="square"
                size="medium"
                classnames="rounded-r-md"
                callToAction={LOCATIONS.GERECHTSTRAAT}
              />
            </span>
          </Container>
        </div>
      </section>
      {sections?.map((section) => renderComponents(section))}
    </>
  );
}
