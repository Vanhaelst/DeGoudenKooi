import { Container } from "@/components/atoms";
import { Title } from "@/components/molecules/title/title";
import { BentoCard } from "@/components/molecules/bento/bento-card";
import { getBackgroundColor } from "@/utils/getBackgroundColor";
import { clsx } from "clsx";

export const Grid = ({ title, description, gridItems, backgroundColor }) => {
  const bgColor = getBackgroundColor(backgroundColor);

  console.log(gridItems);
  return (
    <section className={bgColor}>
      <Container classnames="py-24 sm:py-32">
        <Title title={title} description={description} />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-12 md:grid-rows-2">
          {gridItems?.map((item) => {
            if (!item) {
              return null;
            }

            return (
              <div
                key={item.title}
                // TODO add switch and add classes to config
                className={clsx(
                  "flex",
                  item.gridSize === "oneThird" ? " md:col-span-5" : "",
                  item.gridSize === "twoThirds" ? "md:col-span-7" : "",
                  item.gridSize === "fullWidth" ? "md:col-span-12" : "",
                )}
              >
                <BentoCard {...item} />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
