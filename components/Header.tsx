import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import navigation from "../utils/navigation";
import { signIn } from "next-auth/react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">NoteStorm</span>
            <img
              className="h-8 w-auto"
              src="/notestorm-icon.png"
              alt="NoteStorm"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target={item.target}
              className="text-base font-semibold leading-6 text-gray-900 hover:text-gray-500"
            >
              {item.icon && (
                <span className="inline-block pr-2 align-text-top">
                  {item.icon}
                </span>
              )}
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            className="text-base font-semibold leading-6 text-gray-900 hover:text-gray-500"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">NoteStorm</span>
              <img
                className="h-8 w-auto"
                src="/notestorm-icon.png"
                alt="NoteStorm"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg py-2 px-3 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                    {item.icon && (
                      <span className="inline-block pl-2 align-text-top">
                        {item.icon}
                      </span>
                    )}
                  </a>
                ))}
              </div>
              <div className="py-5">
                <a
                  className="-mx-3 block rounded-lg py-2 px-3 text-lg font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => signIn("google", { callbackUrl: "/home" })}
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
