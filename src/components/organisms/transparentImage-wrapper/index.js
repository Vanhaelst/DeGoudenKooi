export default async function ImageWrapper({ image, children }) {
  if (image) {
    return (
      <div
        className="bg-[length:100%_auto] bg-no-repeat pb-20 mx-2 sm:mx-0"
        style={{ backgroundImage: `url('${image.url}')` }}
      >
        {children}
      </div>
    );
  }

  return <div className="pb-20 mx-2 sm:mx-0">{children}</div>;
}
