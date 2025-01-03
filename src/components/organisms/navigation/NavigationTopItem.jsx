export default function NavigationTopItem({ item }) {
  const { name, href } = item ?? {};

  return (
    <a
      href={href}
      className="text-sm text-white cursor-pointer hover:underline"
    >
      {name}
    </a>
  );
}
