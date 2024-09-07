import { Suspense } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { NewEmailForm } from "../components/NewEmailForm";
import { SentEmails } from "../components/SentEmails";

export default function Page() {
  return (
    <main className="flex gap-4 justify-center m-4 lg:m-8 items-start">
      <section className="bg-white rounded shadow flex-initial w-96">
        <h2 className="font-bold p-4 lg:px-8 lg:py-4 border-b border-solid border-neutral-200">
          New email
        </h2>

        <NewEmailForm className="p-4 lg:p-8" />
      </section>

      <section className="bg-white rounded shadow flex-auto">
        <h2 className="font-bold p-4 lg:px-8 lg:py-4 border-b border-solid border-neutral-200">
          Sent emails
        </h2>

        <Suspense
          fallback={
            <CgSpinnerTwoAlt className="animate-spin m-4 lg:m-8 text-4xl" />
          }
        >
          <SentEmails className="p-4 lg:p-8" />
        </Suspense>
      </section>
    </main>
  );
}
