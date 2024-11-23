import clsx from "clsx";
import { type ReactNode } from "react";

type Props = Readonly<{
  className?: string;
  heading: ReactNode;
  headingSrOnly?: boolean;
  badge?: ReactNode;
  badgeVariant?: "error";
  description?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
}>;

export const Tile = ({
  className,
  heading,
  headingSrOnly,
  badge,
  badgeVariant = "error",
  description,
  children,
  compact,
}: Props) => {
  return (
    <section
      className={clsx(
        className,
        "bg-white dark:bg-neutral-800 rounded drop-shadow-sm",
      )}
    >
      <div
        className={clsx({
          "border-b border-solid border-neutral-200 dark:border-neutral-700 px-4 py-2 lg:px-8 lg:py-4":
            !headingSrOnly || description,
        })}
      >
        <div
          className={clsx({
            ["flex gap-4"]: !headingSrOnly,
          })}
        >
          <h2
            className={clsx({
              "sr-only": headingSrOnly,
              "font-bold": !headingSrOnly,
            })}
          >
            {heading}
          </h2>

          {badge && !headingSrOnly && (
            <span
              className={clsx("border border-solid rounded-3xl text-sm px-1", {
                "bg-red-100 dark:bg-red-950 border-red-500 text-red-500":
                  badgeVariant === "error",
              })}
            >
              {badge}
            </span>
          )}
        </div>

        {description && <div className="text-neutral-500">{description}</div>}
      </div>

      <div
        className={clsx({
          "p-4 xl:p-8": !compact,
          "p-2 xl:p-4": compact,
        })}
      >
        {children}
      </div>
    </section>
  );
};
