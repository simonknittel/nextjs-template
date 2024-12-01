"use client";
import type { ReactNode } from "react";
import { Button, Tooltip, TooltipTrigger } from "react-aria-components";
import { FaRegCircleQuestion } from "react-icons/fa6";

type EntryProps = Readonly<{
  className?: string;
  children: ReactNode;
  childrenClassName?: string;
  title: ReactNode;
  tooltip?: ReactNode;
}>;

export const MetadataTileEntryClient = ({
  className,
  children,
  childrenClassName,
  title,
  tooltip,
}: EntryProps) => {
  return (
    <div className={className}>
      <dt className="text-muted-foreground text-sm">
        {tooltip ? (
          <TooltipTrigger delay={0}>
            <Button className="flex gap-1 items-center">
              {title} <FaRegCircleQuestion />
            </Button>

            <Tooltip className="bg-white rounded drop-shadow-sm border-neutral-200 border-solid border-[1px] p-2 text-sm max-w-80">
              {tooltip}
            </Tooltip>
          </TooltipTrigger>
        ) : (
          title
        )}
      </dt>

      <dd className={childrenClassName}>{children}</dd>
    </div>
  );
};
