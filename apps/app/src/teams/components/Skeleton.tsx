import clsx from "clsx";

type Props = Readonly<{
  className?: string;
}>;

export const Skeleton = ({ className }: Props) => {
  return (
    <div className={clsx(className, "rounded bg-white h-32 animate-pulse")} />
  );
};
