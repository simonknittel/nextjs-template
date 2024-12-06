import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found | Next.js Template",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="min-h-dvh flex justify-center items-center flex-col py-8"
    >
      <h1 className="text-center font-bold text-8xl">404</h1>

      <p className="mt-4">Page not found</p>
    </main>
  );
}
