"use client";

import clsx from "clsx";
import { useState, type ReactNode } from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";

type Props = Readonly<{
  className?: string;
  heading: ReactNode;
  headingSrOnly?: boolean;
  collapsed?: boolean;
  children: ReactNode;
}>;

export const TableTile = ({
  className,
  heading,
  headingSrOnly,
  collapsed = false,
  children,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  return (
    <section className={clsx(className)}>
      <h2
        className={clsx("font-bold", {
          "sr-only": headingSrOnly,
          "mb-2": !headingSrOnly,
        })}
      >
        {collapsed ? (
          <button
            type="button"
            onClick={() => setIsCollapsed((currentValue) => !currentValue)}
            className="flex items-center gap-1"
            title={isCollapsed ? "Open" : "Close"}
          >
            {heading}
            <IoChevronDownCircleOutline
              className={clsx(
                "transition-transform relative top-[1px] text-xl",
                {
                  "transform rotate-180": !isCollapsed,
                },
              )}
            />
          </button>
        ) : (
          heading
        )}
      </h2>

      {!isCollapsed && (
        <div className="bg-white rounded drop-shadow-sm overflow-hidden">
          <div className="overflow-auto">{children}</div>
        </div>
      )}
    </section>
  );
};