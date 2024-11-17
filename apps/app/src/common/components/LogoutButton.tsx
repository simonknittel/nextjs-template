import { logoutAction } from "@/authentication/actions/logoutAction";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Button } from "./Button";

export const LogoutButton = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form action={logoutAction}>
      <Button variant="secondary" title="Log out" iconOnly={true} type="submit">
        <RiLogoutCircleRLine />
      </Button>
    </form>
  );
};
