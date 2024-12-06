import { cn } from "@/common/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, Check } from "lucide-react";
import type { HTMLAttributes } from "react";

const alertVariants = cva(
  "relative w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3 [&>svg]:text-zinc-950 [&>svg~*]:pl-7 dark:border-zinc-800 dark:[&>svg]:text-zinc-50",
  {
    variants: {
      variant: {
        default: "bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50",
        success:
          "border-green-700/50 text-green-700 dark:border-green-700 [&>svg]:text-green-700 dark:border-green-600/50 dark:text-green-600 dark:dark:border-green-600 dark:[&>svg]:text-green-600",
        destructive:
          "border-red-500/50 text-red-500 dark:border-red-500 [&>svg]:text-red-500 dark:border-red-500/50 dark:text-red-500 dark:dark:border-red-500 dark:[&>svg]:text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type AlertProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    disableDefaultTitle?: boolean;
  };

export const Alert = ({
  className,
  variant,
  children,
  disableDefaultTitle = false,
  ...props
}: AlertProps) => (
  <div
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  >
    {disableDefaultTitle ? (
      children
    ) : (
      <>
        {variant === "success" && (
          <>
            <Check className="size-4" />
            <AlertTitle>Success</AlertTitle>
          </>
        )}

        {variant === "destructive" && (
          <>
            <AlertCircle className="size-4" />
            <AlertTitle>Error</AlertTitle>
          </>
        )}

        <AlertDescription>{children}</AlertDescription>
      </>
    )}
  </div>
);

type AlertTitleProps = HTMLAttributes<HTMLHeadingElement>;

export const AlertTitle = ({ className, ...props }: AlertTitleProps) => (
  <h5
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
);

type AlertDescriptionProps = HTMLAttributes<HTMLDivElement>;

export const AlertDescription = ({
  className,
  ...props
}: AlertDescriptionProps) => (
  <div className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
);
