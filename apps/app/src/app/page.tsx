import { Tile } from "@/common/components/Tile";
import { Suspense } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { NewEmailForm } from "../emails/components/NewEmailForm";
import { SentEmails } from "../emails/components/SentEmails";

export default function Page() {
  return (
    <main className="flex gap-4 justify-center m-4 lg:m-8 items-start">
      <h1 className="sr-only">Next.js Template</h1>

      <Tile heading="New email" className="flex-initial w-96">
        <NewEmailForm />
      </Tile>

      <Tile heading="Sent emails" className="flex-auto">
        <Suspense
          fallback={
            <CgSpinnerTwoAlt className="animate-spin m-4 lg:m-8 text-4xl" />
          }
        >
          <SentEmails />
        </Suspense>
      </Tile>
    </main>
  );
}
