import { Suspense } from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileActionBar } from "./MobileActionBar";

export const Navigation = () => {
  return (
    <>
      <div className="lg:hidden">
        <Suspense
          fallback={
            <div className="fixed z-40 left-0 right-0 bottom-0 h-16 bg-neutral-100" />
          }
        >
          <MobileActionBar />
        </Suspense>
      </div>

      <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-80 flex-col">
        <Suspense fallback={<div className="bg-neutral-100" />}>
          <DesktopSidebar />
        </Suspense>
      </div>
    </>
  );
};
