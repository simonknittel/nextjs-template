import { Input } from "@/shadcn/components/ui/input";
import clsx from "clsx";
import { type ComponentProps } from "react";

type Props = Readonly<{
  className?: string;
}> &
  ComponentProps<"input">;

export const TextInput = (props: Props) => {
  const { className, ...other } = props;

  return (
    <Input
      type="text"
      className={clsx(
        "flex h-11 items-center px-2 bg-white rounded border-neutral-200 border-solid border-[1px] cursor-text",
        className,
      )}
      size={1}
      {...other}
    />
  );
};
