import PopupComponent from "@/components/molecules/popup/popup";
import { fetchData } from "@/utils/fetchData";
import { PopupQuery } from "@/queries/sections/popup";

async function getPage({ language }) {
  return fetchData(PopupQuery({ language }));
}

export default async function Popup({ locale }) {
  const { popup } = await getPage({
    language: locale,
  });

  if (!popup || popup.length === 0) {
    return null;
  }

  return <PopupComponent {...popup[0]} />;
}
