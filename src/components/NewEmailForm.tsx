"use client";

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
      <input
        type="email"
        name="email"
        className="border rounded p-2"
        placeholder="Recipient"
        required
        autoFocus
        autoComplete="email"
      />

      <textarea
        name="body"
        className="border rounded p-2"
        placeholder="Body"
        required
        rows={5}
      />

      <button
        type="submit"
        disabled={isPending}
        className="flex gap-2 items-center self-end px-4 py-2 bg-black rounded text-white"
      >
        {isPending ? (
          <CgSpinnerTwoAlt className="animate-spin" />
        ) : (
          <FaRegPaperPlane />
        )}
        Submit
      </button>
    </form>
  );
};
