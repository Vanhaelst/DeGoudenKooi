import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import React from "react";
import { Button } from "@/components/atoms";

const CaptchaButton = ({ onVerifyCaptcha }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const clickHandler = async () => {
    console.log("here", executeRecaptcha);
    if (!executeRecaptcha) {
      const token = await executeRecaptcha("contact");
      onVerifyCaptcha(token);
      return;
    }

    const token = await executeRecaptcha("contact");

    onVerifyCaptcha(token);
  };

  return (
    <Button
      onClick={clickHandler}
      callToAction="Please validate you are a human."
    />
  );
};

export const ReCaptcha = ({ onVerifyCaptcha }) => (
  <GoogleReCaptchaProvider
    reCaptchaKey={"6Ld0cQ4sAAAAAKeRQpFdQTD8OZ5z5_WT3cDIOUnq"}
  >
    <CaptchaButton onVerifyCaptcha={onVerifyCaptcha} />
  </GoogleReCaptchaProvider>
);
