import clsx from "clsx";
import { Button } from "./Button";

interface Props {
  readonly className?: string;
}

export const SkipToMain = ({ className }: Props) => {
  return (
    <Button
      asChild
      className={clsx(
        "fixed left-2 top-2 z-50 opacity-0 pointer-events-none focus:opacity-100 focus:pointer-events-auto",
        className,
      )}
    >
      <a href="#main">Skip to main content</a>
    </Button>
  );
};
