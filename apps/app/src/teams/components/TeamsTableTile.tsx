import { getTeams } from "../queries";
import { Table } from "./Table";

type Props = Readonly<{
  className?: string;
}>;

export const TeamsTableTile = async ({ className }: Props) => {
  const teams = await getTeams();
  return <Table teams={teams} className={className} />;
};
