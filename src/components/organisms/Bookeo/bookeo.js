import { Container } from "@/components/atoms";
import Script from "next/script";

export const Bookeo = () => {
  return (
    <>
      <Script
        type="text/javascript"
        src="https://bookeo.com/widget.js?a=3250KXLLEU151F84FE360&type=325043P7UH151F85563A6"
      ></Script>
      <section id="book">
        <Container>
          <iframe
            className="w-full h-[500px] py-24"
            src="https://www-2552n.bookeo.com/bookeo/b_viewGenericGiftVouchers.html?bsid=pehkxw9prtawfj94&backNav=true&ncs=k93pnuaj7e&ncs2=hxnt6xrtla"
          />
        </Container>
      </section>
    </>
  );
};
