export const MegaMenuItem = ({ label, subItems }) => {
  return (
    <div>
      <h3 className="text-sm font-medium leading-6 text-gray-500">{label}</h3>
      <div className="mt-6 flow-root">
        <div className="-my-2">
          {subItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900"
            >
              <item.icon
                aria-hidden="true"
                className="h-6 w-6 flex-none text-gray-400"
              />
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
