import clsx from "clsx";
import type { ReactNode } from "react";

interface EntryProps {
  readonly className?: string;
  readonly children: ReactNode;
  readonly childrenClassName?: string;
  readonly title: ReactNode;
  readonly tooltip?: ReactNode;
}

export const MetadataTileEntry = ({
  className,
  children,
  childrenClassName,
  title,
}: EntryProps) => {
  return (
    <div className={clsx(className)}>
      <dt className="text-muted-foreground text-sm">{title}</dt>

      <dd className={childrenClassName}>{children}</dd>
    </div>
  );
};
