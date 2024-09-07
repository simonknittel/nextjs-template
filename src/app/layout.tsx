import type { Metadata } from "next";
import { type ReactNode } from "react";
import ReactQueryProvider from "../components/ReactQueryProvider";
import { ToasterWrapper } from "../components/ToasterWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Template",
};

type Props = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="de" className="bg-neutral-100">
      <body>
        <ReactQueryProvider>
          {children}
          <ToasterWrapper />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
