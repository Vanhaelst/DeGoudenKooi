import { Button, RichText, Text } from "@/components/atoms";

export const Cta = ({
  title,
  description,
  buttons,
  backgroundImage,
  pullUp,
}) => {
  return (
    <div
      className={`bg-primary-500 rounded-3xl bg-no-repeat bg-contain bg-right-bottom ${pullUp ? "relative -top-20" : ""}`}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      <div className="mx-auto p-8 lg:p-16">
        <Text as={"h2"} level="3xl" classnames="text-white lg:max-w-[80%]">
          {title}
        </Text>
        <RichText text={description} classnames="text-white" />
        <div className="space-x-2 mt-6">
          {buttons?.map(({ href, variant, callToAction }) => {
            return (
              <Button
                key={href}
                variant={variant}
                href={href}
                callToAction={callToAction}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
