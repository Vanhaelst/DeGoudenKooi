"use client";

import React, { useState, useRef, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";

export default function ModalVideo({ thumb, videoPlayer, videoId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef(null);

  return (
    <div className="flex justify-center">
      {/* Video thumbnail */}
      <button
        className="group relative flex items-center justify-center rounded-3xl focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 w-full"
        onClick={() => {
          setModalOpen(true);
        }}
        aria-label="Watch the video"
      >
        {thumb && (
          <Image
            className="w-full transition-all duration-300"
            src={thumb.url}
            width={thumb.width}
            height={thumb.height}
            priority
            alt={thumb.alt}
          />
        )}
        {/*
        <svg
          className="pointer-events-none absolute transition-transform duration-300 ease-in-out group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
        >
          <circle
            className="fill-white"
            cx="36"
            cy="36"
            r="36"
            fillOpacity=".8"
          />
          <path
            className="fill-indigo-500 drop-shadow-2xl"
            d="M44 36a.999.999 0 0 0-.427-.82l-10-7A1 1 0 0 0 32 29V43a.999.999 0 0 0 1.573.82l10-7A.995.995 0 0 0 44 36V36c0 .001 0 .001 0 0Z"
          />
        </svg>*/}
      </button>
      {/* End: Video thumbnail */}

      <Transition
        show={modalOpen}
        as={Fragment}
        afterEnter={() => videoRef.current?.play()}
      >
        <Dialog initialFocus={videoRef} onClose={() => setModalOpen(false)}>
          {/* Modal backdrop */}
          <TransitionChild
            as="div"
            className="fixed inset-0 z-[99999] bg-black bg-opacity-80 transition-opacity"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          />
          {/* End: Modal backdrop */}

          {/* Modal dialog */}
          <TransitionChild
            as="div"
            className="fixed inset-0 z-[99999] flex px-4 py-6 md:px-6"
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-75"
            enterTo="opacity-100 scale-100"
            leave="transition ease-out duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            <div className="mx-auto flex h-full max-w-5xl items-center">
              <DialogPanel className="aspect-video max-h-full overflow-hidden rounded-3xl bg-black shadow-2xl w-[95vw] md:w-[80vw]">
                {videoPlayer === "vimeo" && (
                  <iframe
                    src={videoId}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="video"
                    style={{ width: "100%", height: "100%" }}
                    title="Dental Office Puurs"
                  />
                )}

                {videoPlayer === "youtube" && (
                  <iframe
                    src={videoId}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="video"
                    style={{ width: "100%", height: "100%" }}
                    title="Dental Office Puurs"
                  />
                )}
              </DialogPanel>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
    </div>
  );
}
