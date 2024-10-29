"use client";

import { Button } from "@/components/Button";
import { EmailInput } from "@/components/form/EmailInput";
import { Textarea } from "@/components/form/Textarea";
import Modal from "@/components/Modal";
import clsx from "clsx";
import { useId, useState, useTransition, type ReactNode } from "react";
import toast from "react-hot-toast";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { FaCheck, FaRegPaperPlane } from "react-icons/fa";
import { newEmailAction } from "../actions/newEmailAction";

type Props = Readonly<{
  className?: string;
  children?: ReactNode;
}>;

export const NewEmailForm = ({ className }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const formId = useId();

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

      setIsOpen(false);
    });
  };

  return (
    <form
      action={_action}
      className={clsx(className, "flex flex-col gap-2")}
      id={formId}
    >
      <EmailInput
        name="email"
        placeholder="Recipient"
        required
        autoFocus
        autoComplete="email"
      />

      <Textarea name="body" placeholder="Body" required rows={5} />

      <Button
        type="button"
        disabled={isPending || isOpen}
        className="self-end"
        onClick={() => setIsOpen(true)}
      >
        {isPending ? (
          <CgSpinnerTwoAlt className="animate-spin" />
        ) : (
          <FaRegPaperPlane />
        )}
        Submit
      </Button>

      <Modal
        isOpen={isOpen}
        heading="Confirmation required"
        className="w-96"
        onRequestClose={() => setIsOpen(false)}
      >
        <p>Please confirm sending the email.</p>

        <div className="mt-8 flex gap-2 flex-row-reverse">
          <Button type="submit" disabled={isPending} form={formId} autoFocus>
            {isPending ? (
              <CgSpinnerTwoAlt className="animate-spin" />
            ) : (
              <FaCheck className="text-sm" />
            )}
            Confirm
          </Button>

          <Button
            type="button"
            disabled={isPending}
            onClick={() => setIsOpen(false)}
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </form>
  );
};
