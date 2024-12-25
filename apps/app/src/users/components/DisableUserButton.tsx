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
import type { User } from "@nextjs-template/database";
import clsx from "clsx";
import { Ban, Loader2 } from "lucide-react";
import { unstable_rethrow } from "next/navigation";
import { useId, useTransition } from "react";
import toast from "react-hot-toast";
import { disableUserAction } from "../actions/disableUserAction";

type Props = Readonly<{
  className?: string;
  user: Pick<User, "id">;
}>;

export const DisableUserButton = ({ className, user }: Props) => {
  const [isPending, startTransition] = useTransition();
  const id = useId();

  const formAction = (formData: FormData) => {
    startTransition(async () => {
      try {
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
    <form
      action={formAction}
      id={id}
      className={clsx("inline-block", className)}
    >
      <input type="hidden" name="id" value={user.id} />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={isPending}
            variant="destructive"
            title="Disable user"
          >
            {isPending ? <Loader2 className="animate-spin" /> : <Ban />}
            Disable user
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable user?</AlertDialogTitle>
            <AlertDialogDescription>
              The user won&apos;t be able to log in anymore.
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
