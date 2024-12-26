import Link from "next/link";

export default function NavigationTopItem({ item }) {
  const { name, href } = item ?? {};

  return (
    <Link
      href={href}
      className="text-sm text-white cursor-pointer hover:underline"
    >
      {name}
    </Link>
  );
}
