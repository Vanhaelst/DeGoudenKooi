import { Container } from "@/components/atoms";
import Script from "next/script";

export const Bookeo = () => {
  return (
    <>
      <Script
        type="text/javascript"
        src="https://bookeo.com/widget.js?a=3250KXLLEU151F84FE360&type=325043P7UH151F85563A6"
      ></Script>
      <section>
        <Container>
          <iframe
            className="w-full h-[500px] py-24"
            src="https://www-2552n.bookeo.com/bookeo/startroute_3250KXLLEU151F84FE360?ralias=true&axiomframed=true&inwidget=true&a=3250KXLLEU151F84FE360&category=325073FEXL162392927A1&languageCode=nl_NL&aguid=3250KXLLEU151F84FE360&axiom_bid=tfjluhwuufuatayc&w=2026496563&t=LiitrQT2fBrjOuUGhASdB%2ByjEzOyT7trg4yILafQwBI%3D&c=03i&m=25262d141429"
          />
        </Container>
      </section>
      https://www-2552n.bookeo.com/bookeo/b_viewGenericGiftVouchers.html?bsid=pehkxw9prtawfj94&backNav=true&ncs=k93pnuaj7e&ncs2=hxnt6xrtla
    </>
  );
};
