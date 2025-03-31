export default function NavigationTopItem({ item }) {
  if (!item) {
    return null;
  }

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
