import { Card, CardContent } from "@/common/components/Card";
import { TableTile } from "@/common/components/TableTile";
import { Thead } from "@/common/components/Thead";
import { UserRole, type User } from "@nextjs-template/database";
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
      <Card className={className}>
        <CardContent className="py-6">
          <p>No users found</p>
        </CardContent>
      </Card>
    );

  return (
    <TableTile className={clsx(className)} heading="All users" headingSrOnly>
      <table className="w-full min-w-[320px] text-sm">
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
        "grid grid-cols-[1fr_80px] items-center h-11 border-b last-of-type:border-b-0"
      }
    >
      <td className="overflow-hidden h-full">
        <Link
          href={`/admin/users/user/${user.id}`}
          className="flex items-center px-4 h-full hover:bg-muted"
        >
          {user.email}
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
