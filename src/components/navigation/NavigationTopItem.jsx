import Link from "next/link";

export default function NavigationTopItem({ item }) {
  const { name, href } = item ?? {};

  return (
    <Link href={href} className="text-sm text-black hover:underline">
      {name}
    </Link>
  );
}
