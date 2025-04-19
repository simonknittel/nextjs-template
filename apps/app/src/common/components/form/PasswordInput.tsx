import { Input } from "@/common/components/form/Input";
import clsx from "clsx";
import { type ComponentProps } from "react";

interface Props extends ComponentProps<typeof Input> {
  readonly className?: string;
}

export const PasswordInput = (props: Props) => {
  const { className, ...other } = props;

  return (
    <Input type="password" className={clsx(className)} size={1} {...other} />
  );
};
