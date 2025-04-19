import clsx from "clsx";
import { Logo } from "../Logo";

interface Props {
  readonly className?: string;
}

export const SidebarHeader = ({ className }: Props) => {
  return (
    <header
      className={clsx(
        className,
        "flex items-center justify-center border-b p-4",
      )}
    >
      <Logo size="compact" />
    </header>
  );
};
