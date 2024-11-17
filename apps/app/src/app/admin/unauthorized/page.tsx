import { authenticatePage } from "@/authentication/authenticateAndAuthorize";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Unauthorized | Next.js Template",
};

export default async function NotFound() {
  await authenticatePage("/admin/unauthorized");

  return (
    <main className="min-h-dvh flex justify-center items-center flex-col py-8">
      <p>You don&apos;t have the required permissions.</p>
    </main>
  );
}
