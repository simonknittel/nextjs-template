import { logoutAction } from "@/authentication/actions/logoutAction";
import { Button } from "@/shadcn/components/ui/button";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form action={logoutAction}>
      <Button variant="outline" size="icon" title="Log out" type="submit">
        <LogOut />
      </Button>
    </form>
  );
};
