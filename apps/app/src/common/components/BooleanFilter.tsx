"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, type ComponentProps, type ReactNode } from "react";
import { Checkbox } from "./form/Checkbox";

interface Props {
  readonly className?: string;
  readonly identifier: string;
  readonly children: ReactNode;
}

export const BooleanFilter = ({ className, identifier, children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = useId();

  const handleChange: ComponentProps<typeof Checkbox>["onCheckedChange"] = (
    checked,
  ) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (checked) {
      newSearchParams.set(identifier, "true");
    } else {
      newSearchParams.delete(identifier);
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <div className={clsx(className, "flex items-center gap-2 overflow-hidden")}>
      <Checkbox
        id={id}
        checked={searchParams.get(identifier) === "true"}
        onCheckedChange={handleChange}
        className="flex-none"
      />

      <label
        className="flex gap-2 items-center cursor-pointer overflow-hidden"
        htmlFor={id}
      >
        <span className="overflow-hidden whitespace-nowrap text-ellipsis">
          {children}
        </span>
      </label>
    </div>
  );
};
