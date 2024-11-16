import clsx from "clsx";
import { type ComponentProps } from "react";

type Props = Readonly<{
  className?: string;
}> &
  ComponentProps<"input">;

export const EmailInput = (props: Props) => {
  const { className, ...other } = props;

  return (
    <input
      type="email"
      className={clsx(
        "flex h-11 items-center px-2 bg-white rounded border-neutral-200 border-solid border-[1px] cursor-text",
        className,
      )}
      size={1}
      {...other}
    />
  );
};
