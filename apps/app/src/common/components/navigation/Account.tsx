import { logoutAction } from "@/authentication/actions/logoutAction";
import { authenticate } from "@/authentication/authenticateAndAuthorize";
import clsx from "clsx";
import { Ellipsis, LogOut, UserRoundCog } from "lucide-react";
import Link from "next/link";
import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../DropdownMenu";

interface Props {
  readonly className?: string;
}

export const Account = async ({ className }: Props) => {
  const authentication = await authenticate();
  if (!authentication) return null;

  return (
    <div className={clsx(className, "flex items-center justify-between p-4")}>
      <p>
        <span className="block text-sm text-muted-foreground">Account</span>
        <span className="block font-bold">{authentication.user.email}</span>
      </p>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" title="Open account menu">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Account</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/admin/account" passHref>
              <UserRoundCog />
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer">
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <button onClick={logoutAction} className="w-full">
              <LogOut />
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
