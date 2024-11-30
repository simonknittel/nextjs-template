import clsx from "clsx";
import type { ReactNode } from "react";

type EntryProps = Readonly<{
  className?: string;
  children: ReactNode;
  childrenClassName?: string;
  title: ReactNode;
  tooltip?: ReactNode;
}>;

export const MetadataTileEntry = ({
  className,
  children,
  childrenClassName,
  title,
}: EntryProps) => {
  return (
    <div className={clsx(className)}>
      <dt className="text-muted-foreground">{title}</dt>

      <dd className={childrenClassName}>{children}</dd>
    </div>
  );
};
