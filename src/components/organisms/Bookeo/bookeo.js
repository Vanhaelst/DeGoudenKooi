import { Container } from "@/components/atoms";
import Script from "next/script";

export const Bookeo = () => {
  return (
    <>
      <Script
        type="text/javascript"
        src="https://bookeo.com/widget.js?a=3250KXLLEU151F84FE360"
      ></Script>
      <section>
        <Container>
          {/* <iframe
            className="w-full h-[1500px]"
            src="https://www-2551n.bookeo.com/bookeo/startroute_42551APHH9M16146FF8DE0?ralias=true&axiomframed=true&inwidget=true&a=42551APHH9M16146FF8DE0&aguid=42551APHH9M16146FF8DE0&axiom_bid=cewewtexumjuxfnl&w=-265787924&t=6sjSxlQvjDpkx9w6eouZ8LUVv1KAPIHMwOPaae%2F5nYU%3D&c=03b&m=251a161d3040"
          />
            */}
          <iframe
            className="w-full h-[500px] py-24"
            src="https://www-2552n.bookeo.com/bookeo/startroute_3250KXLLEU151F84FE360?ralias=true&axiomframed=true&inwidget=true&a=3250KXLLEU151F84FE360&category=325073FEXL162392927A1&languageCode=nl_NL&aguid=3250KXLLEU151F84FE360&axiom_bid=tfjluhwuufuatayc&w=2026496563&t=LiitrQT2fBrjOuUGhASdB%2ByjEzOyT7trg4yILafQwBI%3D&c=03i&m=25262d141429"
          />
        </Container>
      </section>
    </>
  );
};
