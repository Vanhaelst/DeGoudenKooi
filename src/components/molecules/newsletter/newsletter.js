import Script from "next/script";
import { getDictionary } from "@/app/[locale]/dictionaries";
import { Container, Text } from "@/components/atoms";

export default async function Newsletter({ locale }) {
  const t = await getDictionary(locale);

  const handleSubmit = () => {
    console.log("test");
  };

  return (
    <section
      className={`py-32 bg-bottom bg-cover -mb-20`}
      style={{
        backgroundImage: `url('/hero-badges-scheur.webp')`,
      }}
    >
      <Container classnames="">
        <div className="p-8 lg:p-16">
          <Text as={"h2"} level="2xl" classnames="text-white text-center">
            {t.newsletter.title}
          </Text>

          <div id="mc_embed_shell" className="w-full  lg:pt-2">
            <link
              href="//cdn-images.mailchimp.com/embedcode/classic-061523.css"
              rel="stylesheet"
              type="text/css"
            />
            {/*<style type="text/css">
              #mc_embed_signup{background:#fff; false;clear:left; font:14px Helvetica,Arial,sans-serif; width: 600px;}
              /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
              We recommend moving this block and the preceding CSS link to the HEAD of your HTML file.
            </style>*/}
            <div id="mc_embed_signup">
              <form
                action="https://degoudenkooi.us12.list-manage.com/subscribe/post?u=041e826c02983efe2d13909c3&id=09e631601d&f_id=0076f5e3f0"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                className="validate"
                target="_blank"
              >
                <div id="mc_embed_signup_scroll">
                  <div className="mc-field-group">
                    <label htmlFor="mce-EMAIL" className="sr-only">
                      {t.newsletter.mail} <span className="asterisk">*</span>
                    </label>
                    <input
                      type="email"
                      name="EMAIL"
                      placeholder={t.newsletter.mail}
                      className="required email bg-white text-primary-500 rounded-none"
                      id="mce-EMAIL"
                      required=""
                    />
                  </div>
                  <div className="mc-field-group">
                    <label htmlFor="mce-FNAME" className="sr-only">
                      {t.newsletter.name} <span className="asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      name="FNAME"
                      placeholder={t.newsletter.name}
                      className="required text bg-white text-primary-500 rounded-none"
                      id="mce-FNAME"
                      required=""
                    />
                  </div>
                  <div className="mc-field-group">
                    <label htmlFor="mce-MMERGE3-month" className="sr-only">
                      {t.newsletter.birthdate}{" "}
                    </label>
                    <div className="datefield text-white">
                      <span className="subfield dayfield">
                        <input
                          className="birthday REQ_CSS bg-white text-primary-500 rounded-none"
                          type="text"
                          pattern="[0-9]*"
                          placeholder="DD"
                          size="2"
                          maxLength="2"
                          name="MMERGE3[day]"
                          id="mce-MMERGE3-day"
                        />
                      </span>{" "}
                      /{" "}
                      <span className="subfield monthfield">
                        <input
                          className="birthday REQ_CSS bg-white text-primary-500 px-2 rounded-none"
                          type="text"
                          pattern="[0-9]*"
                          placeholder="MM"
                          size="2"
                          maxLength="2"
                          name="MMERGE3[month]"
                          id="mce-MMERGE3-month"
                        />
                      </span>
                      <span className="small-meta nowrap ml-2">
                        {t.newsletter.birthdate}
                      </span>
                    </div>
                  </div>
                  <div id="mce-responses" className="clear">
                    <div
                      className="response"
                      id="mce-error-response"
                      style={{ display: "none" }}
                    ></div>
                    <div
                      className="response"
                      id="mce-success-response"
                      style={{ display: "none" }}
                    ></div>
                  </div>
                  <div
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-5000px" }}
                  >
                    <input
                      type="text"
                      name="b_041e826c02983efe2d13909c3_09e631601d"
                      tabIndex="-1"
                      value=""
                    />
                  </div>
                  <div className="clear">
                    <input
                      type="submit"
                      name="subscribe"
                      id="mc-embedded-subscribe"
                      className="button"
                      value={t.newsletter.button}
                      onClick={handleSubmit()}
                    />
                  </div>
                </div>
              </form>
            </div>

            <Script
              src="https://code.jquery.com/jquery-3.7.1.slim.min.js"
              integrity="sha256-kmHvs0B+OpCW5GVHUNjv9rOmY0IvSIRcf7zGUDTDQM8="
              crossOrigin="anonymous"
              strategy="beforeInteractive"
            ></Script>

            <Script
              type="text/javascript"
              src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
              strategy="beforeInteractive"
            ></Script>

            {locale === "nl" && (
              <Script
                id="mailchimp-validate-translate"
                type="text/javascript"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[3]='MMERGE3';ftypes[3]='birthday';
                  $.extend($.validator.messages, {
                          required: "Dit is een verplicht veld.",
                          remote: "Controleer dit veld.",
                          email: "Vul hier een geldig e-mailadres in.",
                          url: "Vul hier een geldige URL in.",
                          date: "Vul hier een geldige datum in.",
                          dateISO: "Vul hier een geldige datum in (ISO-formaat).",
                          number: "Vul hier een geldig getal in.",
                          digits: "Vul hier alleen getallen in.",
                          creditcard: "Vul hier een geldig creditcardnummer in.",
                          equalTo: "Vul hier dezelfde waarde in.",
                          accept: "Vul hier een waarde in met een geldige extensie.",
                          maxlength: $.validator.format("Vul hier maximaal {0} tekens in."),
                          minlength: $.validator.format("Vul hier minimaal {0} tekens in."),
                          rangelength: $.validator.format("Vul hier een waarde in van minimaal {0} en maximaal {1} tekens."),
                          range: $.validator.format("Vul hier een waarde in van minimaal {0} en maximaal {1}."),
                          max: $.validator.format("Vul hier een waarde in kleiner dan of gelijk aan {0}."),
                          min: $.validator.format("Vul hier een waarde in groter dan of gelijk aan {0}.")
                  });}(jQuery));var $mcj = jQuery.noConflict(true);`,
                }}
              />
            )}
          </div>
        </div>{" "}
      </Container>
    </section>
  );
}
