import clsx from "clsx";
import { type ComponentProps } from "react";
import { FaCheck } from "react-icons/fa";

type Props = Readonly<{
  className?: string;
}> &
  ComponentProps<"input">;

export const Checkbox = (props: Props) => {
  const { className, id, children, disabled, ...other } = props;

  return (
    <label
      htmlFor={id}
      className={clsx(className, "flex gap-2 items-center cursor-pointer", {
        "opacity-50 pointer-events-none": disabled,
      })}
    >
      <input
        id={id}
        type="checkbox"
        className="hidden peer"
        disabled={disabled}
        {...other}
      />

      <span className="flex items-center justify-center size-6 bg-white border-neutral-300 border-solid border-[1px] rounded peer-checked:*:block peer-checked:*:!opacity-100 peer-hover:*:block peer-hover:*:opacity-30">
        <FaCheck className="hidden" />
      </span>

      {children}
    </label>
  );
};
