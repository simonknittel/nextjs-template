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
      <table className="w-full min-w-[320px]">
        <Thead className="grid-cols-[1fr]">
          <th>Name</th>
        </Thead>

        <tbody>
          {/* Could probably done with a smart `.sort()` function but this is easier to read */}

          {teams
            .filter((team) => !team.disabledAt)
            .map((team) => (
              <Row key={team.id} team={team} />
            ))}

          {teams
            .filter((team) => team.disabledAt)
            .map((team) => (
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
        "grid grid-cols-[1fr] items-center gap-4 h-14 border-b last-of-type:border-b-0",
      )}
    >
      <td title={team.name} className="overflow-hidden h-full">
        <Link
          href={`/admin/teams/team/${team.id}`}
          className="flex items-center gap-2 py-2 h-full text-base px-4 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:bg-neutral-300 dark:active:bg-neutral-600 transition-colors"
        >
          <span className="overflow-hidden whitespace-nowrap text-ellipsis">
            {team.name}
          </span>

          {team.disabledAt && (
            <span className="text-neutral-500 italic">(disabled)</span>
          )}
        </Link>
      </td>
    </tr>
  );
};
