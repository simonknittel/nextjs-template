import { Tile } from "@/common/components/Tile";
import { UserRole, type User } from "@/db";
import clsx from "clsx";
import { UpdateUserRoleForm } from "./UpdateUserRoleForm";

type Props = Readonly<{
  className?: string;
  user: Pick<User, "id" | "disabledAt" | "role">;
}>;

export const UserRoleTile = ({ className, user }: Props) => {
  const roles = Object.values(UserRole);

  return (
    <Tile className={clsx(className)} heading="Role">
      <UpdateUserRoleForm user={user} roles={roles} />
    </Tile>
  );
};
