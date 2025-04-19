import { Input } from "@/common/components/form/Input";
import clsx from "clsx";
import { type ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {
  readonly className?: string;
}

export const TextInput = (props: Props) => {
  const { className, ...other } = props;

  return <Input type="text" className={clsx(className)} size={1} {...other} />;
};
