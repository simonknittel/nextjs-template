import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/Card";
import clsx from "clsx";
import { type ReactNode } from "react";

interface Props {
  readonly className?: string;
  readonly heading: ReactNode;
  readonly badge?: ReactNode;
  readonly badgeVariant?: "error";
  readonly description?: ReactNode;
  readonly children?: ReactNode;
}

export const Tile = ({
  className,
  heading,
  badge,
  badgeVariant = "error",
  description,
  children,
}: Props) => {
  return (
    <Card className={clsx(className)}>
      <CardHeader>
        <CardTitle>
          <h2>{heading}</h2>

          {badge && (
            <span
              className={clsx("border border-solid rounded-3xl text-sm px-1", {
                "bg-red-100 dark:bg-red-950 border-red-500 text-red-500":
                  badgeVariant === "error",
              })}
            >
              {badge}
            </span>
          )}
        </CardTitle>

        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
};
