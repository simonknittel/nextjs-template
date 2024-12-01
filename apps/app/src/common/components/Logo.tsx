import logo from "@/assets/logo_rounded.png";
import clsx from "clsx";
import Image from "next/image";

type Props = Readonly<{
  className?: string;
  size?: "default" | "compact";
}>;

export const Logo = ({ className, size = "default" }: Props) => {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <Image
        src={logo}
        alt="Logo of Next.js Template"
        width={size === "compact" ? 24 : 32}
        height={size === "compact" ? 24 : 32}
      />

      <p className={clsx("font-bold", { "text-2xl": size === "default" })}>
        Next.js Template
      </p>
    </div>
  );
};
