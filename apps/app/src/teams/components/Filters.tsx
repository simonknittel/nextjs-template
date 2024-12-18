import { BooleanFilter } from "@/common/components/BooleanFilter";
import clsx from "clsx";

type Props = Readonly<{
  className?: string;
}>;

export const Filters = ({ className }: Props) => {
  return (
    <div
      className={clsx(
        "rounded-xl border bg-card text-card-foreground shadow px-6 py-3 flex gap-4 items-center",
        className,
      )}
    >
      <p>Filters</p>

      <BooleanFilter identifier="show-disabled">Show disabled</BooleanFilter>
    </div>
  );
};
