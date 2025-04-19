import clsx from "clsx";
import { type ReactNode } from "react";
import { Tile } from "../Tile";

interface Props {
  readonly className?: string;
  readonly children: ReactNode;
}

export const MetadataTile = ({ className, children }: Props) => {
  return (
    <Tile heading="Details" className={clsx(className)}>
      <dl className="flex flex-col gap-4">{children}</dl>
    </Tile>
  );
};
