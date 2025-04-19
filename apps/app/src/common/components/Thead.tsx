import clsx from "clsx";
import { type ReactNode } from "react";

interface Props {
  readonly className?: string;
  readonly children: ReactNode;
}

export const Thead = ({ className, children }: Props) => {
  return (
    <thead>
      <tr
        className={clsx(
          "grid items-center text-left h-11 border-b text-muted-foreground [&>th]:px-4",
          className,
        )}
      >
        {children}
      </tr>
    </thead>
  );
};
