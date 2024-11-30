import { Input } from "@/shadcn/components/ui/input";
import clsx from "clsx";
import { type ComponentProps } from "react";

type Props = Readonly<{
  className?: string;
}> &
  ComponentProps<typeof Input>;

export const PasswordInput = (props: Props) => {
  const { className, ...other } = props;

  return (
    <Input type="password" className={clsx(className)} size={1} {...other} />
  );
};
