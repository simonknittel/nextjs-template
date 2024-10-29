"use client";

import { Button } from "@/components/Button";
import { EmailInput } from "@/components/form/EmailInput";
import { Textarea } from "@/components/form/Textarea";
import clsx from "clsx";
import { useTransition, type ReactNode } from "react";
import toast from "react-hot-toast";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { FaRegPaperPlane } from "react-icons/fa";
import { newEmailAction } from "../actions/newEmailAction";

type Props = Readonly<{
  className?: string;
  children?: ReactNode;
}>;

export const NewEmailForm = ({ className }: Props) => {
  const [isPending, startTransition] = useTransition();

  const _action = (formData: FormData) => {
    startTransition(async () => {
      try {
        const response = await newEmailAction(formData);

        if (response === undefined || response.status === 200) {
          toast.success("Success");
        } else {
          toast.error(response.errorMessage);
          console.error(response);
        }
      } catch (error) {
        toast.error("An unknown error occurred. Please try again later.");
        console.error(error);
      }
    });
  };

  return (
    <form action={_action} className={clsx(className, "flex flex-col gap-2")}>
      <EmailInput
        name="email"
        placeholder="Recipient"
        required
        autoFocus
        autoComplete="email"
      />

      <Textarea name="body" placeholder="Body" required rows={5} />

      <Button type="submit" disabled={isPending} className="self-end">
        {isPending ? (
          <CgSpinnerTwoAlt className="animate-spin" />
        ) : (
          <FaRegPaperPlane />
        )}
        Submit
      </Button>
    </form>
  );
};
