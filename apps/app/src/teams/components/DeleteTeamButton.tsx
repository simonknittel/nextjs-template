"use client";

import { Button } from "@/common/components/Button";
import type { Team } from "@nextjs-template/database";
import clsx from "clsx";
import { unstable_rethrow } from "next/navigation";
import { useTransition, type ReactNode } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { deleteTeamAction } from "../actions/deleteTeamAction";

type Props = Readonly<{
  className?: string;
  children?: ReactNode;
  team: Pick<Team, "id" | "name">;
}>;

export const DeleteTeamButton = ({ className, children, team }: Props) => {
  const [isPending, startTransition] = useTransition();

  const _action = (formData: FormData) => {
    startTransition(async () => {
      try {
        const confirmation = window.confirm(
          `Do you want to disable this team?`,
        );
        if (!confirmation) return;

        const response = await deleteTeamAction(formData);

        if (response === undefined || response.status === 200) {
          toast.success("Successfully disabled");
        } else {
          toast.error(
            response.errorMessage ??
              "An error occurred. Please try again later.",
          );
          console.error(response);
        }
      } catch (error) {
        unstable_rethrow(error);
        toast.error("An error occurred. Please try again later.");
        console.error(error);
      }
    });
  };

  return (
    <form action={_action} className={clsx(className, "inline-block")}>
      <input type="hidden" name="id" value={team.id} />

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
