import clsx from "clsx";

interface Props {
  readonly className?: string;
}

export const Skeleton = ({ className }: Props) => {
  return (
    <div
      className={clsx(
        className,
        "rounded bg-white dark:bg-neutral-800 h-32 animate-pulse",
      )}
    />
  );
};
