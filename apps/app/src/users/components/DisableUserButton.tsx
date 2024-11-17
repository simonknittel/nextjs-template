"use client";

import { Button } from "@/common/components/Button";
import { disableUserAction } from "@/users/actions/disableUserAction";
import { type User } from "@prisma/client";
import clsx from "clsx";
import { unstable_rethrow } from "next/navigation";
import { useTransition, type ReactNode } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

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
          `Willst du "${user.email}" deaktivieren?`,
        );
        if (!confirmation) return;

        const response = await disableUserAction(formData);

        if (response === undefined || response.status === 200) {
          toast.success("Erfolgreich deaktiviert");
        } else {
          toast.error(
            response.errorMessage ??
              "Beim Deaktivieren ist ein Fehler aufgetreten.",
          );
          console.error(response);
        }
      } catch (error) {
        unstable_rethrow(error);
        toast.error("Beim Deaktivieren ist ein Fehler aufgetreten.");
        console.error(error);
      }
    });
  };

  return (
    <form action={_action} className={clsx(className, "inline-block")}>
      <input type="hidden" name="id" value={user.id} />

      <Button
        disabled={isPending}
        variant="tertiary"
        colorScheme="red"
        type="submit"
        title="Disable"
        iconOnly={!Boolean(children)}
        onClick={(e) => e.stopPropagation()}
      >
        {isPending ? <FaSpinner className="animate-spin" /> : <FiTrash2 />}
        {children}
      </Button>
    </form>
  );
};
