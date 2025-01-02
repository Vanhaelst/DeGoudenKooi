import { Container } from "@/components/atoms";
import Script from "next/script";

export const Bookeo = () => {
  return (
    <>
      <p>-- START BOOKEO --</p>

      <script
        type="text/javascript"
        src="https://bookeo.com/widget.js?a=3250KXLLEU151F84FE360&type=325043P7UH151F85563A6"
      />
      <p>-- END BOOKEO --</p>
    </>
  );
};
