"use client";

import clsx from "clsx";
import type { ComponentProps } from "react";

/**
 * Make sure this file stays up to date with <Link>
 */

type Props = Readonly<{
  variant?: "primary" | "secondary" | "tertiary" | null;
  colorScheme?: "black" | "red" | null;
  iconOnly?: boolean | null;
}> &
  ComponentProps<"button">;

export const Button = (props: Props) => {
  const {
    variant = "primary",
    colorScheme = "black",
    iconOnly,
    className,
    ...other
  } = props;

  return (
    <button
      className={clsx(className, {
        "flex items-center justify-center rounded gap-2 py-2 min-h-11 text-base disabled:opacity-50 disabled:cursor-not-allowed":
          true,

        "w-11":
          iconOnly &&
          ["primary", "secondary", "tertiary"].includes(variant ?? ""),
        "px-6":
          !iconOnly &&
          ["primary", "secondary", "tertiary"].includes(variant ?? ""),

        "font-bold": variant === "primary",
        border: variant === "secondary",

        "bg-black text-white enabled:hover:bg-neutral-700 enabled:active:bg-neutral-800":
          variant === "primary" && colorScheme === "black",
        "bg-red-500 text-white enabled:hover:bg-red-400 enabled:active:bg-red-700":
          variant === "primary" && colorScheme === "red",

        "border-black text-black enabled:hover:border-neutral-700 enabled:hover:text-neutral-700 enabled:active:border-neutral-800 enabled:active:text-neutral-800":
          variant === "secondary" && colorScheme === "black",
        "border-red-500 text-red-500 enabled:hover:border-red-400 enabled:hover:text-red-500 enabled:active:border-red-700 enabled:active:text-red-700":
          variant === "secondary" && colorScheme === "red",

        "text-black enabled:hover:text-neutral-700 enabled:active:text-neutral-800":
          variant === "tertiary" && colorScheme === "black",
        "text-red-500 enabled:hover:text-red-400 enabled:active:text-red-900":
          variant === "tertiary" && colorScheme === "red",
      })}
      {...other}
    />
  );
};
