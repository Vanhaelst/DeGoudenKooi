import { getBackgroundColor } from "@/utils/getBackgroundColor";
import { Container, Text } from "@/components/atoms";

export default async function Newsletter({
  backgroundColor = "secondary",
  pullUp = true,
  t,
}) {
  const bgColor = getBackgroundColor(backgroundColor);

  return (
    <section className={`${bgColor}`}>
      <Container classnames="">
        <div
          className={`bg-primary-500 rounded-3xl grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 p-8 lg:p-16 ${pullUp ? "relative -top-20" : ""}`}
        >
          <Text
            as={"h2"}
            level="2xl"
            classnames="text-white lg:max-w-[80%]  lg:col-span-7"
          >
            {t.newsletter.title}
          </Text>
          <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
            <div className="flex gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                {t.newsletter.mail}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t.newsletter.button}
              </button>
            </div>
          </form>
        </div>{" "}
      </Container>
    </section>
  );
}
