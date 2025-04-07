"use client";

import fallback from "../../public/fallback-image.png";
import Image from "next/image";
import { useState } from "react";
import { clsx } from "clsx";

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
      onError={() => setImageError(true)}
      className={clsx(classnames, objectFit || "cover")}
    />
  );
}

export default ImageWithFallback;
