import { Container } from "@/components/atoms";

const BOOKEO = {
  main: "https://bookeo.com/widget.js?a=3250KXLLEU151F84FE360",
  escapeGame_overview: "&type=325073FEXL162392927A1",
  deSchatVanKalakmul: "&type=325043P7UH151F85563A6",
  cabinInTheWoods: "&type=3250UPXAHR151F88DFDCB",
  deMeesterdiefVanMechelen: "&type=3250LW3NJC152DACE84DC",
  lostInSpace: "&type=3250YYENK7153BC9919C9",
  teambuilding: "&type=3250HRP3RH151F85563A5",
  teambuilding_teambuilding: "&type=32506UP46Y1529854BCD1",
  teambuilding_meting_half: "&type=3250KJY9TR1522C619F43",
  teambuilding_meting_full: "&type=32507MF7991522C6A06AB",
  escapeExperience_overview: "&type=3250T6JU3P162392A8FCF",
  hetGeheimVanSintRumoldus: "&type=3250CCEL6L16239322C96",
  deWraakVanHan: "&type=425524R9E6P17E25452487",
  escapeWalk_overview: "&type=42552AH3CLR186AD05FA70",
  escapeWalk: "&type=42552JF9XXT186AD0B4B42",
  varia: "&type=3250HNWC761623948C7CB",
  vouhcer:
    "https://bookeo.com/widget.js?a=3250KXLLEU151F84FE360&startmode=buyvoucher",
};

export const Bookeo = ({ type = "", variant = "", locale }) => {
  const lang = locale === "en" ? "&languageCode=en_US" : "";

  console.log(
    variant,
    BOOKEO[variant],
    `${BOOKEO.main}${variant ? BOOKEO[variant] : ""}${lang}`,
  );
  return (
    <div className="relative">
      <Container classnames="min-h-80 flex justify-center items-center">
        {type === "giftcard" ? (
          <script
            defer
            type="text/javascript"
            src={`${BOOKEO.vouhcer}${lang}`}
          ></script>
        ) : (
          <script
            defer
            type="text/javascript"
            src={`${BOOKEO.main}${variant ? BOOKEO[variant] : ""}${lang}`}
          ></script>
        )}
      </Container>
    </div>
  );
};
