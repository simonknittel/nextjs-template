import clsx from "clsx";
import { type ReactNode } from "react";

type Props = Readonly<{
  className?: string;
  children: ReactNode;
}>;

export const PageHeading = ({ className, children }: Props) => {
  return (
    <h1
      className={clsx(
        "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {children}
    </h1>
  );
};
