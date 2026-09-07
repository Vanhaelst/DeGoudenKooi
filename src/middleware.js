import { NextResponse } from "next/server";

const ALLOWED_ROOT_PATHS = new Set([
  "_next",
  "_vercel",
  "api",
  "aircotech",
  "en",
  "nl",
]);

const PUBLIC_ROOT_FILES = new Set([
  "achtergrond.png",
  "achtergrond2.png",
  "artwork-diamond.png",
  "award1.webp",
  "award2.webp",
  "award3.webp",
  "award4.webp",
  "award5.webp",
  "befeb.webp",
  "bird.png",
  "border-bottom-left.png",
  "border-top-right.png",
  "degoudenkooi.jpeg",
  "degoudenkooi.png",
  "degoudenkooi.svg",
  "dgk-card.jpeg",
  "fallback-image.png",
  "favicon.ico",
  "hero-badges-OG.png",
  "hero-badges-scheur-OG.png",
  "hero-badges-scheur.webp",
  "hero-badges-top.png",
  "hero-badges.webp",
  "hero-bg.png",
  "icon-age-10.svg",
  "icon-age.svg",
  "icon-coins.svg",
  "icon-group-dark.svg",
  "icon-group.svg",
  "icon-hourglass-2.svg",
  "icon-hourglass-dark.svg",
  "icon-hourglass.svg",
  "icon-location-dark.svg",
  "icon-location.svg",
  "kalender.svg",
  "loader.gif",
  "loading.gif",
  "logo.png",
  "pattern.png",
  "robots.txt",
  "scheur-bottom.png",
  "scheur-footer-top.png",
  "scheur-top.png",
  "share_image_DGK.jpg",
  "sitemap.xml",
  "star-full.svg",
  "star-half.svg",
  "symbool.png",
]);

const PUBLIC_ROOT_DIRECTORIES = new Set(["aircotech", "favicons", "tippagina"]);

function notFoundResponse() {
  return new NextResponse("Not found", {
    status: 404,
    headers: {
      "Cache-Control": "public, max-age=300",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export function middleware(request) {
  const pathSegments = request.nextUrl.pathname.split("/").filter(Boolean);

  if (pathSegments.length === 0) {
    return NextResponse.next();
  }

  if (pathSegments.some((segment) => segment.toLowerCase() === "undefined")) {
    return notFoundResponse();
  }

  const [rootPath] = pathSegments;

  if (
    ALLOWED_ROOT_PATHS.has(rootPath) ||
    PUBLIC_ROOT_DIRECTORIES.has(rootPath) ||
    PUBLIC_ROOT_FILES.has(rootPath) ||
    rootPath === ".well-known"
  ) {
    return NextResponse.next();
  }

  return notFoundResponse();
}

export const config = {
  matcher: "/:path*",
};
