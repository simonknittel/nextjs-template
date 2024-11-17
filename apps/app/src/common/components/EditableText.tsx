import clsx from "clsx";
import { unstable_rethrow } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { FaPen, FaSave, FaSpinner } from "react-icons/fa";
import type { ServerAction } from "../utils/actions";
import { useOutsideClick } from "../utils/useOutsideClick";

type Props = Readonly<{
  className?: string;
  action: ServerAction;
  initialValue: string | null;
  required?: boolean;
  textarea?: boolean;
}>;

export const EditableText = ({
  className,
  action,
  initialValue,
  required,
  textarea,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(initialValue ?? "");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const { ref: outsideRef } = useOutsideClick(() => {
    setIsEditing(false);
  });

  const handleClick = () => {
    setIsEditing(true);
  };

  const _action = (formData: FormData) => {
    startTransition(async () => {
      try {
        const response = await action(formData);

        if (response.status === 200) {
          toast.success("Successfully saved");
          setValue(formData.get("value")?.toString() ?? "");
          setIsEditing(false);
        } else {
          /**
           * `setTimeout()` is need here because `isPending` is used for the `disabled` attribute on
           * the input element and `isPending` only reverts to false once this transition finishes.
           * This would lead to calling `focus()` too early.
           */
          setTimeout(() => {
            inputRef.current?.focus();
          }, 1);

          toast.error(
            response.errorMessage ??
              "An error occurred while saving. Please try again later.",
          );
        }
      } catch (error) {
        unstable_rethrow(error);

        /**
         * `setTimeout()` is need here because `isPending` is used for the `disabled` attribute on
         * the input element and `isPending` only reverts to false once this transition finishes.
         * This would lead to calling `focus()` too early.
         */
        setTimeout(() => {
          inputRef.current?.focus();
        }, 1);

        toast.error("An error occurred while saving. Please try again later.");
        console.error(error);
      }
    });
  };

  return (
    <span className={clsx(className)}>
      {isEditing ? (
        <form
          action={_action}
          className="flex gap-2 items-center -mx-1 pr-3"
          ref={outsideRef}
        >
          {textarea ? (
            <textarea
              name="value"
              defaultValue={value}
              disabled={isPending}
              className={clsx(
                "flex-auto min-w-0 rounded bg-white border-neutral-200 border-solid border-[1px] p-1",
                {
                  "animate-pulse": isPending,
                },
              )}
              autoFocus
              required={required}
              // @ts-expect-error Not sure how to fix this
              ref={inputRef}
              rows={5}
            />
          ) : (
            <input
              type="text"
              name="value"
              defaultValue={value}
              disabled={isPending}
              className={clsx(
                "flex-auto min-w-0 rounded bg-white border-neutral-200 border-solid border-[1px] p-1",
                {
                  "animate-pulse": isPending,
                },
              )}
              autoFocus
              required={required}
              // @ts-expect-error Not sure how to fix this
              ref={inputRef}
            />
          )}

          <button disabled={isPending} className="flex-none group" title="Save">
            {isPending ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaSave className="group-hover:text-neutral-700 group-active:test-neutral-900" />
            )}
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="flex items-center rounded gap-2 py-1 text-base px-2 -ml-2 hover:bg-neutral-200 active:bg-neutral-300 text-left"
          title="Click to edit"
        >
          {value ? (
            textarea ? (
              <pre className="font-sans text-wrap">{value}</pre>
            ) : (
              value
            )
          ) : (
            <span className="flex-auto text-neutral-500 italic">Empty</span>
          )}
          <FaPen className="flex-none text-sm" />
        </button>
      )}
    </span>
  );
};
