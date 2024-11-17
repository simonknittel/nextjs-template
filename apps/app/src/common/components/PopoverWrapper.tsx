import clsx from "clsx";
import { type ReactNode } from "react";
import { Dialog, Popover, type PopoverProps } from "react-aria-components";
import styles from "./PopoverWrapper.module.css";

type Props = Omit<PopoverProps, "children"> & {
  children: ReactNode;
};

export const PopoverWrapper = ({ children, ...props }: Props) => {
  return (
    <Popover {...props} placement="top">
      <Dialog
        className={clsx(
          "bg-white rounded drop-shadow-sm border-neutral-200 border-solid border-[1px] p-4",
          styles.Dialog,
        )}
      >
        {children}
      </Dialog>
    </Popover>
  );
};
