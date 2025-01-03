"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINKS } from "@/enums/links";

export function MobileNavigation({ locale, nav, open, setOpen }) {
  const pathname = usePathname();

  return (
    <div className="bg-white">
      <Dialog
        open={open}
        onClose={() => null}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full justify-between md:justify-normal transform flex-col overflow-y-auto bg-primary-500 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="absolute right-0 px-2 pb-2 md:pt-16 md:pb-16 pt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-ml-2 bg-secondary-500 p-2 text-white rounded-xl"
              >
                <span className="sr-only">Open menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <ul className="mt-24 menu rounded-box w-full">
              {nav.map(({ name, href, children }) => {
                if (children) {
                  return (
                    <li key={name}>
                      <details>
                        <summary>{name}</summary>
                        <ul>
                          {children.map(({ title, slug }) => (
                            <li key={title}>
                              <a href={`/${locale}/${slug}`}>{title}</a>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  );
                }
                return (
                  <li key={name}>
                    <a href={href}>{name} </a>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-6 px-4 py-6  md:mt-12">
              <a
                href={LINKS.NL.HOME}
                className={`flex justify-end md:justify-center items-center font-barlow text-md font-medium hover:text-accent-500 ${!pathname.startsWith("/fr") && !pathname.startsWith("/en") ? "text-accent-500" : "text-white"}`}
              >
                Nederlands
              </a>
              <a
                href={LINKS.EN.HOME}
                className={`flex justify-end md:justify-center items-center font-barlow text-md font-medium hover:text-accent-500 ${pathname.startsWith("/en") ? "text-accent-500" : "text-white"}`}
              >
                English
              </a>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
