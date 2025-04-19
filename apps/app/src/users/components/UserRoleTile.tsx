import { Tile } from "@/common/components/Tile";
import { UserRole, type User } from "@/db";
import clsx from "clsx";
import { UpdateUserRoleForm } from "./UpdateUserRoleForm";

interface Props {
  readonly className?: string;
  readonly user: Pick<User, "id" | "disabledAt" | "role">;
}

export const UserRoleTile = ({ className, user }: Props) => {
  const roles = Object.values(UserRole);

  return (
    <Tile className={clsx(className)} heading="Role">
      <UpdateUserRoleForm user={user} roles={roles} />
    </Tile>
  );
};
