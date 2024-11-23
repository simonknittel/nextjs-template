"use client";

import { Button } from "@/common/components/Button";
import { EmailInput } from "@/common/components/form/EmailInput";
import { PopoverWrapper } from "@/common/components/PopoverWrapper";
import clsx from "clsx";
import { unstable_rethrow } from "next/navigation";
import { useContext, useId, useTransition } from "react";
import {
  Button as AriaButton,
  DialogTrigger,
  OverlayTriggerStateContext,
} from "react-aria-components";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { FiPlusCircle, FiSave } from "react-icons/fi";
import { createUserAction } from "../actions/createUserAction";

type Props = Readonly<{
  className?: string;
}>;

export const CreateUserButton = ({ className }: Props) => {
  return (
    <DialogTrigger>
      <AriaButton
        className={clsx(
          className,
          "flex items-center justify-center rounded gap-2 py-2 min-h-11 text-base px-6 bg-black text-white enabled:hover:bg-neutral-700 enabled:active:bg-neutral-800 font-bold",
        )}
      >
        <FiPlusCircle />
        New user
      </AriaButton>

      <PopoverWrapper>
        <Content />
      </PopoverWrapper>
    </DialogTrigger>
  );
};

const Content = () => {
  const state = useContext(OverlayTriggerStateContext);
  const [isPending, startTransition] = useTransition();
  const inputId = useId();

  const action = (formData: FormData) => {
    startTransition(async () => {
      try {
        const response = await createUserAction(formData);

        if (response === undefined || response.status === 200) {
          toast.success("Successfully saved");
          state.close();
        } else {
          toast.error(
            response.errorMessage ??
              "An error occurred while saving. Please try again later.",
          );
          console.error(response);
        }
      } catch (error) {
        unstable_rethrow(error);
        toast.error("An error occurred while saving. Please try again later.");
        console.error(error);
      }
    });
  };

  return (
    <form className="flex gap-4" action={action}>
      <div>
        <label
          htmlFor={inputId}
          className="block font-bold dark:text-neutral-200"
        >
          Email address
        </label>
        <EmailInput
          id={inputId}
          name="email"
          required
          className="w-48"
          // autoFocus // TODO: Results in a bug when the site is too long
          autoComplete="email"
        />
      </div>

      <Button
        iconOnly
        title="Save"
        className="h-[42px] self-end w-11"
        disabled={isPending}
        type="submit"
      >
        {isPending ? <FaSpinner className="animate-spin" /> : <FiSave />}
      </Button>
    </form>
  );
};
