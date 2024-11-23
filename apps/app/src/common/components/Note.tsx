import clsx from "clsx";
import { type ReactNode } from "react";
import {
  MdOutlineCheck,
  MdOutlineInfo,
  MdOutlineReportGmailerrorred,
} from "react-icons/md";

type Props = Readonly<{
  className?: string;
  children?: ReactNode;
  type: "info" | "success" | "error";
}>;

export const Note = ({ className, children, type }: Props) => {
  return (
    <div
      className={clsx(className, "border rounded p-2 flex gap-2 items-start", {
        "border-blue-500 bg-blue-50 dark:bg-blue-950": type === "info",
        "border-green-500 bg-green-50 dark:bg-green-950": type === "success",
        "border-red-500 bg-red-50 dark:bg-red-950": type === "error",
      })}
    >
      {type === "info" && (
        <MdOutlineInfo className="text-blue-500 text-2xl flex-grow-0 flex-shrink-0" />
      )}

      {type === "success" && (
        <MdOutlineCheck className="text-green-500 text-2xl flex-grow-0 flex-shrink-0" />
      )}

      {type === "error" && (
        <MdOutlineReportGmailerrorred className="text-red-500 text-2xl flex-grow-0 flex-shrink-0" />
      )}

      <span className="text-sm mt-[2px]">{children}</span>
    </div>
  );
};
