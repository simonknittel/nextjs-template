import clsx from "clsx";
import { type ReactNode } from "react";

type Props = Readonly<{
  className?: string;
  children: ReactNode;
}>;

export const Thead = ({ className, children }: Props) => {
  return (
    <thead>
      <tr
        className={clsx(
          "grid items-center gap-4 text-left pr-4 lg:pl-4 h-14 border-b border-solid border-neutral-200",
          className,
        )}
      >
        {children}
      </tr>
    </thead>
  );
};
