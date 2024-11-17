import { TableTile } from "@/common/components/TableTile";
import { Thead } from "@/common/components/Thead";
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
      <section className={className}>
        <div className="bg-white rounded drop-shadow-sm overflow-hidden mt-2 px-4 lg:px-8 py-4">
          <p className="italic text-neutral-500">No teams found</p>
        </div>
      </section>
    );

  return (
    <TableTile className={clsx(className)} heading="All teams" headingSrOnly>
      <table className="w-full min-w-[320px]">
        <Thead className="grid-cols-[1fr]">
          <th className="pl-4">Name</th>
        </Thead>

        <tbody>
          {/* Could probably done with a smart `.sort()` function but this is easier to read */}

          {teams
            .filter((team) => !team.deletedAt)
            .map((team) => (
              <Row key={team.id} team={team} />
            ))}

          {teams
            .filter((team) => team.deletedAt)
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
        "grid grid-cols-[1fr] items-center gap-4 h-14 border-b border-solid border-neutral-200 last-of-type:border-b-0 pr-4 lg:pl-4",
      )}
    >
      <td title={team.name} className="overflow-hidden">
        <Link
          href={`/admin/teams/${team.id}`}
          className="flex items-center rounded gap-2 py-2 h-11 text-base px-4 hover:bg-neutral-200 active:bg-neutral-300 transition-colors"
        >
          <span className="overflow-hidden whitespace-nowrap text-ellipsis">
            {team.name}
          </span>

          {team.deletedAt && (
            <span className="text-neutral-500 italic">(disabled)</span>
          )}
        </Link>
      </td>
    </tr>
  );
};
