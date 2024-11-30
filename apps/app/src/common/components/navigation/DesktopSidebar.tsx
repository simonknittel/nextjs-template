import { requireAuthentication } from "@/authentication/authenticateAndAuthorize";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { TbUser, TbUsers } from "react-icons/tb";
import { Account } from "./Account";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarHighlight } from "./SidebarHighlight";

export const DesktopSidebar = async () => {
  const authentication = await requireAuthentication();

  const showAdministration = authentication.authorize(
    "administration",
    "manage",
  );

  return (
    <div className="flex flex-col justify-between overflow-auto h-full border-r">
      <SidebarHeader />

      <nav className="p-4 relative flex-1" data-sidebar-highlight-container>
        <ul>
          <li>
            <Link
              href="/admin"
              className="flex gap-2 items-center p-4 hover:bg-neutral-500 active:bg-neutral-600 rounded"
            >
              <IoHomeOutline />
              Dashboard
            </Link>
          </li>
        </ul>

        {showAdministration && (
          <div className="mt-4">
            <p className="ml-4 text-muted-foreground mt-4 text-sm">Admin</p>

            <ul>
              <li>
                <Link
                  href="/admin/teams"
                  className="flex gap-2 items-center p-4 hover:bg-neutral-500 active:bg-neutral-600 rounded"
                >
                  <TbUsers />
                  Teams
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/users"
                  className="flex gap-2 items-center p-4 hover:bg-neutral-500 active:bg-neutral-600 rounded"
                >
                  <TbUser />
                  Users
                </Link>
              </li>
            </ul>
          </div>
        )}

        <SidebarHighlight />
      </nav>

      <Account className="border-t" />
    </div>
  );
};
