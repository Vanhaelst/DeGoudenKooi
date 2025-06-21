"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Button, RichText } from "@/components/atoms";

const today = new Date().toDateString();
const delay = 1000;

export default function PopupComponent({
  id,
  position,
  size,
  isBackgroundAsset,
  image = {},
  url,
  cta,
  tag,
  title,
  description,
}) {
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(false);
  const router = useRouter();

  const localStorageKey = `DGK_showedPopup_${id}`;

  useEffect(() => {
    if (today !== localStorage.getItem(localStorageKey) && !closed) {
      setTimeout(() => {
        setOpen(true);
      }, delay);
    }
  }, [closed]);

  const cancelButtonRef = useRef(null);

  const handleClose = () => {
    localStorage.setItem(localStorageKey, new Date().toDateString());
    setOpen(false);
    setClosed(true);
  };
  const handleClick = () => {
    localStorage.setItem(localStorageKey, new Date().toDateString());
    setOpen(false);
    setClosed(true);
    router.push(url);
  };

  const getPosition = () => {
    switch (position) {
      case "bottomRight": {
        return "justify-end items-end";
      }
      case "bottomLeft": {
        return "justify-end items-start";
      }
      default: {
        return "justify-center items-center";
      }
    }
  };

  const getSize = () => {
    switch (size) {
      case "small": {
        return "sm:w-full sm:max-w-sm";
      }
      case "medium": {
        return "sm:w-full sm:max-w-md";
      }
      default: {
        return "sm:w-full sm:max-w-lg";
      }
    }
  };

  const positionClasses = getPosition();
  const sizeClasses = getSize();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[1500]"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className={`flex min-h-full p-4 text-center sm:p-0 ${positionClasses}`}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform rounded-lg text-left shadow-xl transition-all sm:m-8 min-h-[200px] ${sizeClasses} ${isBackgroundAsset ? "w-full bg-cover bg-center" : "bg-white"}`}
                style={
                  isBackgroundAsset
                    ? {
                        backgroundImage: `url("${image[0]?.url}")`,
                      }
                    : {}
                }
              >
                <button
                  type="button"
                  className="absolute right-4 top-4 box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none z-20"
                  aria-label="Close"
                  onClick={handleClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                    className="h-8 w-8"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <a
                  href={url}
                  className="cursor-pointer min-h-[200px] h-full z-10"
                >
                  {isBackgroundAsset ? null : (
                    <div
                      className="ralative h-[300px] w-full bg-gray-50 bg-cover bg-center aspect-video"
                      style={{
                        backgroundImage: `url("${image[0]?.url}")`,
                      }}
                    />
                  )}
                  <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        {tag && <p className="text-sm">{tag}</p>}
                        {title && (
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold leading-6 text-gray-900"
                          >
                            {title}
                          </Dialog.Title>
                        )}
                        {description && (
                          <div className="mt-2">
                            <RichText level="sm" text={description} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {cta && (
                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <span onClick={handleClick}>
                        <Button
                          callToAction={cta}
                          variant="primary"
                          size="large"
                        />
                      </span>
                    </div>
                  )}
                </a>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
