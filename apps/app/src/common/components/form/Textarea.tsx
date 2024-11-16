import clsx from "clsx";
import { type ComponentProps } from "react";

type Props = Readonly<{
  className?: string;
}> &
  ComponentProps<"textarea">;

export const Textarea = (props: Props) => {
  const { className, ...other } = props;

  return (
    <textarea
      className={clsx(
        "w-full p-2 bg-white rounded border-neutral-200 border-solid border-[1px] align-middle",
        className,
      )}
      {...other}
    />
  );
};
