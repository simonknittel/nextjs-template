import { cn } from "@/common/utils/cn";
import * as LabelPrimitive from "@radix-ui/react-label";
import { type ComponentProps } from "react";

type LabelProps = ComponentProps<typeof LabelPrimitive.Root>;

export const Label = ({ className, ...props }: LabelProps) => (
  <LabelPrimitive.Root
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  />
);
