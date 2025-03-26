"use client";

import "photoswipe/style.css";

import React, { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { Title } from "@/components/molecules";
import { Container } from "@/components/atoms";
import Image from "next/image";

const galleryId = `${Math.random().toString(36).slice(2)}`;

export const Gallery = ({ id, title, description, bgColor, images }) => {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + galleryId,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    lightbox.on("uiRegister", function () {
      lightbox.pswp.ui.registerElement({
        name: "download-button",
        order: 8,
        isButton: true,
        tagName: "a",

        // SVG with outline
        html: {
          isCustomSVG: true,
          inner:
            '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
          outlineID: "pswp__icn-download",
        },

        onInit: (el, pswp) => {
          el.setAttribute("download", "");
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener");

          pswp.on("change", () => {
            el.href = pswp.currSlide.data.src;
          });
        },
      });
    });

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  return (
    <div className={`${bgColor} py-12 sm:py-16`}>
      <Container classnames="mb-24">
        <Title title={title} description={description} />
      </Container>

      <div className="pswp-gallery" id={galleryId}>
        <Container classnames="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {images.map((image, index) => (
            <a
              href={image.url}
              data-pswp-width={image.width}
              data-pswp-height={image.height}
              key={galleryId + "-" + index}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={image.url}
                alt=""
                width={image.width}
                height={image.height}
                className="aspect-video object-cover object-center"
              />
            </a>
          ))}
        </Container>
      </div>
    </div>
  );
};
