import { TableTile } from "@/common/components/TableTile";
import { Thead } from "@/common/components/Thead";
import { Card, CardContent } from "@/shadcn/components/ui/card";
import type { Team } from "@nextjs-template/database";
import clsx from "clsx";
import Link from "next/link";

type Props = Readonly<{
  className?: string;
  teams: Team[];
}>;

export const Table = ({ className, teams }: Props) => {
  if (teams.length === 0)
    return (
      <Card className={className}>
        <CardContent className="py-6">
          <p>No teams found</p>
        </CardContent>
      </Card>
    );

  return (
    <TableTile className={clsx(className)} heading="All teams" headingSrOnly>
      <table className="w-full min-w-[320px] text-sm">
        <Thead className="grid-cols-[1fr]">
          <th>Name</th>
        </Thead>

        <tbody>
          {teams.map((team) => (
            <Row key={team.id} team={team} />
          ))}
        </tbody>
      </table>
    </TableTile>
  );
};

type Row = Readonly<{
  team: Team;
}>;

const Row = ({ team }: Row) => {
  return (
    <tr
      key={team.id}
      className={clsx(
        "grid grid-cols-[1fr] items-center gap-4 h-11 border-b last-of-type:border-b-0",
      )}
    >
      <td title={team.name} className="overflow-hidden h-full">
        <Link
          href={`/admin/teams/team/${team.id}`}
          className="flex items-center px-4 h-full hover:bg-muted"
        >
          {team.name}
        </Link>
      </td>
    </tr>
  );
};
