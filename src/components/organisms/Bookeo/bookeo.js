import Script from "next/script";

export const Bookeo = () => {
  return (
    <>
      <p>-- START BOOKEO --</p>

      <Script
        type="text/javascript"
        src="https://bookeo.com/widget.js?a=3250KXLLEU151F84FE360&category=325073FEXL162392927A1"
      ></Script>
      <div className="wsb-canvas-page-container" />
      <p>-- END BOOKEO --</p>
    </>
  );
};
