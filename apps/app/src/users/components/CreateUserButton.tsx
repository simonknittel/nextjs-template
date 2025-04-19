"use client";

import { Button } from "@/common/components/Button";
import { EmailInput } from "@/common/components/form/EmailInput";
import { Label } from "@/common/components/form/Label";
import { Popover, PopoverContent } from "@/common/components/Popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { CirclePlus, Loader2, Save } from "lucide-react";
import { unstable_rethrow } from "next/navigation";
import { useId, useTransition } from "react";
import toast from "react-hot-toast";
import { createUserAction } from "../actions/createUserAction";

interface Props {
  readonly className?: string;
}

export const CreateUserButton = ({ className }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={className}>
          <CirclePlus />
          Create
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Content />
      </PopoverContent>
    </Popover>
  );
};

const Content = () => {
  const [isPending, startTransition] = useTransition();
  const inputId = useId();

  const action = (formData: FormData) => {
    startTransition(async () => {
      try {
        const response = await createUserAction(formData);

        if (response === undefined || response.status === 200) {
          toast.success("Successfully saved");
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
      <div className="flex flex-col gap-2">
        <Label htmlFor={inputId}>Email address</Label>
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
        title="Create new user"
        size="icon"
        disabled={isPending}
        type="submit"
        className="self-end"
      >
        {isPending ? <Loader2 className="animate-spin" /> : <Save />}
      </Button>
    </form>
  );
};
