"use client";

import { Alert } from "@/common/components/Alert";
import { Button } from "@/common/components/Button";
import { Label } from "@/common/components/form/Label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/common/components/form/RadioGroup";
import { type User } from "@nextjs-template/database";
import clsx from "clsx";
import { Loader2, Save } from "lucide-react";
import { useActionState } from "react";
import { updateUserRoleAction } from "../actions/updateUserRoleAction";
import { canUpdateUserRole } from "../can";

type Props = Readonly<{
  className?: string;
  user: Pick<User, "id" | "disabledAt" | "role">;
  roles: string[];
}>;

export const UpdateUserRoleForm = ({ className, user, roles }: Props) => {
  const [state, formAction, isPending] = useActionState(
    updateUserRoleAction,
    null,
  );

  return (
    <form
      action={formAction}
      className={clsx(className, "flex flex-col gap-2")}
    >
      <input type="hidden" name="userId" value={user.id} />

      <RadioGroup
        name="userRole"
        defaultValue={user.role}
        disabled={!canUpdateUserRole(user)}
      >
        {roles.map((role) => (
          <div key={role} className="flex items-center space-x-2">
            <RadioGroupItem value={role} id={role} />
            <Label htmlFor={role}>{role}</Label>
          </div>
        ))}
      </RadioGroup>

      <Button
        type="submit"
        className="self-start mt-4"
        disabled={isPending || !canUpdateUserRole(user)}
      >
        {isPending ? <Loader2 className="animate-spin" /> : <Save />}
        Save
      </Button>

      {state && (
        <Alert
          variant={state.success ? "success" : "destructive"}
          className="mt-4"
        >
          {state.success || state.error}
        </Alert>
      )}
    </form>
  );
};
