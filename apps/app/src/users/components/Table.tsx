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
          <th className="pl-4">Email address</th>
          <th className="pl-4">Role</th>
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
        "grid items-center gap-4 h-14 grid-cols-[1fr_80px] border-b-[1px] last-of-type:border-b-0 border-solid border-neutral-200 dark:border-neutral-700 pr-4 lg:pl-4"
      }
    >
      <td className="overflow-hidden">
        <Link
          href={`/admin/users/user/${user.id}`}
          className="flex items-center rounded gap-2 py-2 h-11 text-base px-4 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:bg-neutral-300 dark:active:bg-neutral-600 transition-colors"
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
