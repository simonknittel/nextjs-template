"use client";

import { Button } from "@/shadcn/components/ui/button";
import type { User } from "@nextjs-template/database";
import clsx from "clsx";
import { Loader2, Save } from "lucide-react";
import { unstable_rethrow } from "next/navigation";
import { useTransition, type ReactNode } from "react";
import toast from "react-hot-toast";
import { disableUserAction } from "../actions/disableUserAction";

type Props = Readonly<{
  className?: string;
  children?: ReactNode;
  user: Pick<User, "id" | "email">;
}>;

export const DisableUserButton = ({ className, children, user }: Props) => {
  const [isPending, startTransition] = useTransition();

  const _action = (formData: FormData) => {
    startTransition(async () => {
      try {
        const confirmation = window.confirm(
          `Please confirm that you want to disable the user "${user.email}".`,
        );
        if (!confirmation) return;

        const response = await disableUserAction(formData);

        if (response === undefined || response.status === 200) {
          toast.success("Successfully disabled user.");
        } else {
          toast.error(response.errorMessage ?? "An unexpected error occurred.");
          console.error(response);
        }
      } catch (error) {
        unstable_rethrow(error);
        toast.error("An unexpected error occurred.");
        console.error(error);
      }
    });
  };

  return (
    <form action={_action} className={clsx(className, "inline-block")}>
      <input type="hidden" name="id" value={user.id} />

      <Button
        disabled={isPending}
        variant="destructive"
        type="submit"
        title="Disable user"
        onClick={(e) => e.stopPropagation()}
      >
        {isPending ? <Loader2 className="animate-spin" /> : <Save />}
        {children}
      </Button>
    </form>
  );
};
