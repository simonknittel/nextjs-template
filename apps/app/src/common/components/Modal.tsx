"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useHotkeys } from "react-hotkeys-hook";
import { FaRegTimesCircle } from "react-icons/fa";

interface Props {
  className?: string;
  isOpen?: boolean | null;
  onRequestClose?: () => void;
  children?: ReactNode;
  heading: ReactNode;
}

export default function Modal({
  className,
  isOpen = false,
  children,
  onRequestClose,
  heading,
}: Readonly<Props>) {
  const router = useRouter();

  useHotkeys("esc", onRequestClose || (() => router.back()), undefined, [
    onRequestClose,
  ]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-30 flex cursor-pointer items-center justify-center bg-white/50 p-2 backdrop-blur-sm"
      onClick={onRequestClose || (() => router.back())}
    >
      <dialog
        className={clsx(
          "bg-white rounded drop-shadow max-h-full max-w-full cursor-auto overflow-auto relative",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
        open
      >
        <h2 className="border-b border-solid border-neutral-200 px-4 py-2 lg:px-8 lg:py-4 font-bold">
          {heading}
        </h2>

        <div className="p-4 xl:p-8">{children}</div>

        <button
          title="Close"
          className="absolute right-1 lg:right-4 top-0 lg:top-2 p-2 text-2xl text-black hover:text-neutral-700 active:text-neutral-800"
          onClick={onRequestClose || (() => router.back())}
        >
          <FaRegTimesCircle />
        </button>
      </dialog>
    </div>,
    document.body,
  );
}
