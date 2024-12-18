import { Container } from "@/components/atoms";
import { Title } from "@/components/molecules/title/title";
import { BentoCard } from "@/components/molecules/bento/bento-card";
import { getBackgroundColor } from "@/utils/getBackgroundColor";

export const Grid = ({ title, description, gridItems, backgroundColor }) => {
  const bgColor = getBackgroundColor(backgroundColor);

  return (
    <section className={bgColor}>
      <Container classnames="py-24 sm:py-32">
        <Title title={title} description={description} />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-12 lg:grid-rows-2">
          {gridItems?.map((item) => {
            if (!item) {
              return null;
            }

            return (
              <div
                key={item.title}
                className={`flex p-px ${item.gridSize === "oneThird" ? " lg:col-span-5" : item.gridSize === "twoThirds" ? "lg:col-span-7" : "lg:col-span-12"}`}
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
