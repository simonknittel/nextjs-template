import { Input } from "@/common/components/form/Input";
import clsx from "clsx";
import { type ComponentProps } from "react";

type Props = Readonly<{
  className?: string;
}> &
  ComponentProps<"input">;

export const TextInput = (props: Props) => {
  const { className, ...other } = props;

  return <Input type="text" className={clsx(className)} size={1} {...other} />;
};
