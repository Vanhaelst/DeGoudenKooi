import { defaultMetadata } from "@/data/metadata";
import Image from "next/image";

export const metadata = {
  ...defaultMetadata,
  robots: "noindex,nofollow",
};

export default async function Home({ params }) {
  return (
    <main>
      <Image
        src="/tippagina/politiebanner.webp"
        height={625}
        width={1667}
        alt="politiebanner"
        className="h-80"
      />
    </main>
  );
}
