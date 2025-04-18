import { requireAuthentication } from "@/authentication/authenticateAndAuthorize";
import clsx from "clsx";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { TbUser, TbUsers } from "react-icons/tb";
import { Account } from "./Account";
import { MobileSidebar } from "./MobileSidebar";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarHighlight } from "./SidebarHighlight";

interface Props {
  readonly className?: string;
}

export const MobileActionBar = async ({ className }: Props) => {
  const authentication = await requireAuthentication();

  const showAdministration = await authentication.authorize(
    "administration",
    "manage",
  );

  return (
    <div
      className={clsx(
        className,
        "fixed z-40 left-0 right-0 bottom-0 h-16 border-t bg-background",
      )}
    >
      <nav className="h-full px-1">
        <ul className="h-full flex justify-evenly">
          <li className="h-full py-1 flex-grow-0 flex-shrink-0 basis-1/5">
            <Link
              href="/admin"
              className="flex flex-col items-center justify-center h-full active:bg-muted rounded"
            >
              <IoHomeOutline className="text-xl" />
              <span className="text-xs text-center">Dashboard</span>
            </Link>
          </li>

          <li className="h-full py-1 flex-grow-0 flex-shrink-0 basis-1/5 flex justify-center">
            <MobileSidebar>
              <SidebarHeader />

              <div
                className="p-4 relative flex-1"
                data-sidebar-highlight-container
              >
                <ul>
                  <li>
                    <Link
                      href="/admin"
                      className="flex gap-2 items-center p-4 active:bg-muted rounded"
                    >
                      <IoHomeOutline />
                      Dashboard
                    </Link>
                  </li>
                </ul>

                {showAdministration && (
                  <div className="mt-4">
                    <p className="ml-4 text-muted-foreground mt-4 text-sm">
                      Admin
                    </p>

                    <ul>
                      <li>
                        <Link
                          href="/admin/teams"
                          className="flex gap-2 items-center p-4 active:bg-muted rounded"
                        >
                          <TbUsers />
                          Teams
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/admin/users"
                          className="flex gap-2 items-center p-4 active:bg-muted rounded"
                        >
                          <TbUser />
                          Users
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}

                <SidebarHighlight />
              </div>

              <Account className="border-t" />
            </MobileSidebar>
          </li>
        </ul>
      </nav>
    </div>
  );
};
