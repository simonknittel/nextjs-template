import { Input } from "@/common/components/form/Input";
import clsx from "clsx";
import { type ComponentProps } from "react";

interface Props extends ComponentProps<typeof Input> {
  readonly className?: string;
}

export const EmailInput = (props: Props) => {
  const { className, ...other } = props;

  return <Input type="email" className={clsx(className)} size={1} {...other} />;
};
