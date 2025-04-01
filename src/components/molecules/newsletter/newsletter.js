import { getBackgroundColor } from "@/utils/getBackgroundColor";
import { Container, Text } from "@/components/atoms";
import Script from "next/script";
import { getDictionary } from "@/app/[locale]/dictionaries";

export default async function Newsletter({ pullUp = true, locale }) {
  const t = await getDictionary(locale);

  return (
    <section
      className={`py-32 bg-bottom bg-cover -mb-20`}
      style={{
        backgroundImage: `url('/hero-badges-scheur.png')`,
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
                action="https://degoudenkooi.us12.list-manage.com/subscribe/post?u=041e826c02983efe2d13909c3&amp;id=09e631601d&amp;f_id=0076f5e3f0"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                className="validate"
                target="_blank"
              >
                <div id="mc_embed_signup_scroll">
                  <div className="mc-field-group">
                    <label htmlFor="mce-EMAIL" className="sr-only">
                      E-mailadres <span className="asterisk">*</span>
                    </label>
                    <input
                      type="email"
                      name="EMAIL"
                      placeholder="E-mailadres"
                      className="required email bg-white text-primary-500 rounded-none"
                      id="mce-EMAIL"
                      required=""
                    />
                  </div>
                  <div className="mc-field-group">
                    <label htmlFor="mce-FNAME" className="sr-only">
                      Voornaam <span className="asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      name="FNAME"
                      placeholder="Voornaam"
                      className="required text bg-white text-primary-500 rounded-none"
                      id="mce-FNAME"
                      required=""
                    />
                  </div>
                  <div className="mc-field-group">
                    <label htmlFor="mce-MMERGE3-month" className="sr-only">
                      Verjaardag{" "}
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
                        (Verjaardag dd / mm )
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
                      value="Subscribe"
                    />
                  </div>
                </div>
              </form>
            </div>

            <Script
              type="text/javascript"
              src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
            ></Script>
          </div>
        </div>{" "}
      </Container>
    </section>
  );
}
