"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/common/components/AlertDialog";
import { Button } from "@/common/components/Button";
import type { Team } from "@nextjs-template/database";
import clsx from "clsx";
import { Ban, Loader2 } from "lucide-react";
import { unstable_rethrow } from "next/navigation";
import { useId, useTransition } from "react";
import toast from "react-hot-toast";
import { disableTeamAction } from "../actions/disableTeamAction";

type Props = Readonly<{
  className?: string;
  team: Pick<Team, "id">;
}>;

export const DisableTeamButton = ({ className, team }: Props) => {
  const [isPending, startTransition] = useTransition();
  const id = useId();

  const _action = (formData: FormData) => {
    startTransition(async () => {
      try {
        const response = await disableTeamAction(formData);

        if (response === undefined || response.status === 200) {
          toast.success("Successfully disabled team.");
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
    <form action={_action} id={id} className={clsx(className, "inline-block")}>
      <input type="hidden" name="id" value={team.id} />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={isPending}
            variant="destructive"
            title="Disable team"
          >
            {isPending ? <Loader2 className="animate-spin" /> : <Ban />}
            Disable
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable team?</AlertDialogTitle>
            <AlertDialogDescription>
              This action can&apos;t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction type="submit" form={id}>
              Disable
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};
