import clsx from "clsx";

type Props = Readonly<{
  className?: string;
}>;

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
