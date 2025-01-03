import { MegaMenu } from "@/components/organisms/navigation/mega-menu";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { LOCATIONS } from "@/enums/locations";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { GAMETYPE } from "@/enums/gameTypes";

async function getGames() {
  return fetchData(
    roomsQuery({
      type: `"${GAMETYPE.GAME}", "${GAMETYPE.EXPERIENCE}", "${GAMETYPE.WALK}"`,
      location: `"${LOCATIONS.GERECHTSTRAAT}", "${LOCATIONS.HAVERWERF}"`,
    }),
  );
}

export const Navigation = async ({ locale = "nl" }) => {
  const dict = await getDictionary(locale); // nl
  const { rooms } = await getGames();

  const gerechtstraat = rooms.filter(
    (room) => room.gameLocation === LOCATIONS.GERECHTSTRAAT,
  );
  const haverwerf = rooms.filter(
    (room) => room.gameLocation === LOCATIONS.HAVERWERF,
  );

  return (
    <>
      <MegaMenu
        locale={locale}
        dict={dict}
        gerechtstraat={gerechtstraat}
        haverwerf={haverwerf}
      />
    </>
  );
};
