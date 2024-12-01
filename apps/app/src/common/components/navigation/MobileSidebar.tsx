"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

type Props = Readonly<{
  children?: ReactNode;
}>;

export const MobileSidebar = ({ children }: Props) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
  }, [pathname]);

  return (
    <>
      <button
        onClick={() => setIsVisible((value) => !value)}
        type="button"
        className="flex flex-col items-center justify-center w-full h-full active:bg-neutral-500 rounded"
      >
        {isVisible ? <FaTimes /> : <FaBars />}
        <span className="text-xs text-center">Navigation</span>
      </button>

      <div
        className={clsx(
          "fixed left-0 top-0 bottom-0 w-80 max-w-[85dvw] z-50 flex flex-col bg-background border-r overflow-auto transition-transform",
          {
            "-translate-x-full": isVisible === false,
            "translate-x-0": isVisible === true,
          },
        )}
      >
        {children}
      </div>

      {isVisible && (
        <div
          className="fixed inset-0 z-40 bg-neutral-100/5 backdrop-blur-sm"
          onClick={() => setIsVisible(false)}
        />
      )}
    </>
  );
};
