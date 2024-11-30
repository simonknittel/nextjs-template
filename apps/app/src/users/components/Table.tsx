import { TableTile } from "@/common/components/TableTile";
import { Thead } from "@/common/components/Thead";
import { UserRole, type User } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { getUsers } from "../queries";

export const dynamic = "force-dynamic";

type Props = Readonly<{
  className?: string;
}>;

export const Table = async ({ className }: Props) => {
  const users = await getUsers();

  if (users.length === 0)
    return (
      <section className={className}>
        <div className="bg-white dark:bg-neutral-800 rounded drop-shadow-sm overflow-hidden mt-2 px-4 lg:px-8 py-4">
          <p className="italic text-neutral-500">No users found</p>
        </div>
      </section>
    );

  return (
    <TableTile className={clsx(className)} heading="All users" headingSrOnly>
      <table className="w-full min-w-[320px]">
        <Thead className="grid-cols-[1fr_80px]">
          <th>Email address</th>
          <th>Role</th>
        </Thead>

        <tbody>
          {users.map((user) => (
            <Row key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </TableTile>
  );
};

type RowProps = Readonly<{
  user: Pick<User, "id" | "email" | "role">;
}>;

const Row = ({ user }: RowProps) => {
  return (
    <tr
      key={user.id}
      className={
        "grid grid-cols-[1fr_80px] items-center h-14 border-b last-of-type:border-b-0"
      }
    >
      <td className="overflow-hidden h-full">
        <Link
          href={`/admin/users/user/${user.id}`}
          className="flex items-center gap-2 py-2 h-full text-base px-4 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:bg-neutral-300 dark:active:bg-neutral-600 transition-colors"
        >
          <span className="flex-auto overflow-hidden text-ellipsis whitespace-nowrap">
            {user.email}
          </span>
        </Link>
      </td>

      <td className="overflow-hidden text-ellipsis whitespace-nowrap h-full flex items-center px-4">
        {user.role === UserRole.DEVELOPER && "Admin"}
        {user.role === UserRole.ADMIN && "Admin"}
        {user.role === UserRole.USER && "User"}
      </td>
    </tr>
  );
};
