import { getDictionary } from "@/app/[locale]/dictionaries";
import { LOCATIONS } from "@/enums/locations";
import { fetchData } from "@/utils/fetchData";
import { roomsQuery } from "@/queries/sections/rooms";
import { GAMETYPE } from "@/enums/gameTypes";
import { NavigationClient } from "@/components/organisms/navigation/navigation-client";

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

  return <NavigationClient locale={locale} dict={dict} rooms={rooms} />;
};
