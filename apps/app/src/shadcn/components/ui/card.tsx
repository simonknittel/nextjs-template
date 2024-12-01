import { cn } from "@/shadcn/lib/utils";
import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className,
    )}
    {...props}
  />
);

type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

type CardTitleProps = HTMLAttributes<HTMLDivElement>;

export const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <div
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
);

type CardDescriptionProps = HTMLAttributes<HTMLDivElement>;

export const CardDescription = ({
  className,
  ...props
}: CardDescriptionProps) => (
  <div className={cn("text-sm text-muted-foreground", className)} {...props} />
);

type CardContentProps = HTMLAttributes<HTMLDivElement>;

export const CardContent = ({ className, ...props }: CardContentProps) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

type CardFooterProps = HTMLAttributes<HTMLDivElement>;

export const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);
