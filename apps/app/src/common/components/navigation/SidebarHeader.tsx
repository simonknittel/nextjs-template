import clsx from "clsx";

type Props = Readonly<{
  className?: string;
}>;

export const SidebarHeader = ({ className }: Props) => {
  return (
    <header
      className={clsx(
        className,
        "flex items-center justify-center border-b border-neutral-700 p-4",
      )}
    >
      <p className="font-bold">Next.js Template</p>
    </header>
  );
};
