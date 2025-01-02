import { Hero } from "@/components/molecules/hero/hero";
import Script from "next/script";
import { CompanyData } from "@/data/companyData";
import { defaultMetadata } from "@/data/metadata";

export async function generateMetadata({ params }) {
  return params.locale === "en"
    ? {
        ...defaultMetadata,
        title: "Shop - De Gouden Kooi",
        description:
          "Shop ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Shop ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
        },
      }
    : {
        ...defaultMetadata,
        title: "Cadeaubon - De Gouden Kooi",
        description:
          "Shop ✓ Escape rooms ✓ Een teamactiviteit voor gezinnen, vrienden en collega's ✓ Twee locaties in centrum Mechelen ✓ Pioniers in België.",
        openGraph: {
          ...defaultMetadata.openGraph,
          description:
            "Een overzicht van de awards die we de voorbije jaren verzamelden.",
        },
      };
}

export default async function Home() {
  return (
    <>
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src="https://bookeo.com/widget.js?a=3250KXLLEU151F84FE360&type=325043P7UH151F85563A6"
      />

      <Hero
        type="vertical"
        title="Cadeaubon"
        backgroundImage={[{ url: CompanyData.heroBg }]}
        description="<p>Een spel bij de Gouden Kooi is vast en zeker een leuk geschenk. Er zijn cadeaubonnen met verschillende waardes en ze zijn 1 jaar geldig (vanaf dag van aankoop). Een cadeaubon hoeft niet in 1 keer gespendeerd te worden. Om de juiste keuze te maken kan je hier de tarieven voor onze escape rooms raadplegen.
Je koopt je cadeaubon online, en krijgt vervolgens een e-mail met alle nodige info.
Je kiest de opmaak van je cadeaubon, zet er een leuke tekst bij en print hem zelf af.
Zo heb je in 1-2-3 een leuk geschenk!</p>"
      />

      <div id="bookeo_position" />
    </>
  );
}
