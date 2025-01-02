import { getBackgroundColor } from "@/utils/getBackgroundColor";
import { Container, Text } from "@/components/atoms";

export default async function Newsletter({
  backgroundColor = "secondary",
  pullUp = true,
}) {
  const bgColor = getBackgroundColor(backgroundColor);

  return (
    <section className={`${bgColor}`}>
      <Container classnames="">
        <div
          className={`bg-primary-500 rounded-3xl grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 p-8 lg:p-16 ${pullUp ? "relative -top-20" : ""}`}
        >
          <Text>test</Text>
        </div>
      </Container>
    </section>
  );
}
