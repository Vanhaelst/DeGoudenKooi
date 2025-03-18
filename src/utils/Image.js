"use client";

import fallback from "../../public/fallback-image.png";
import Image from "next/image";
import { useState } from "react";

function ImageWithFallback({
  src,
  alt,
  width,
  height,
  objectFit,
  classnames,
  fallbackImage,
}) {
  const [imageError, setImageError] = useState(false);

  const fbImage = fallbackImage ? fallbackImage : fallback;
  return (
    <Image
      src={imageError ? fbImage : src}
      alt={alt || ""}
      width={width}
      height={height}
      objectFit={objectFit || "cover"}
      onError={() => setImageError(true)}
      className={classnames}
    />
  );
}

export default ImageWithFallback;
