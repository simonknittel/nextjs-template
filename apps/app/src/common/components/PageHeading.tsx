import clsx from "clsx";
import { type ReactNode } from "react";

type Props = Readonly<{
  className?: string;
  children: ReactNode;
}>;

export const PageHeading = ({ className, children }: Props) => {
  return (
    <h1 className={clsx("text-2xl lg:text-4xl", className)}>{children}</h1>
  );
};
