import { logoutAction } from "@/authentication/actions/logoutAction";
import { Button } from "@/common/components/Button";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
  return (
    <form action={logoutAction}>
      <Button variant="outline" size="icon" title="Log out" type="submit">
        <LogOut />
      </Button>
    </form>
  );
};
