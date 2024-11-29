import ReactQueryProvider from "@/common/components/ReactQueryProvider";
import { ToasterWrapper } from "@/common/components/ToasterWrapper";
import { ThemeProvider } from "@/shadcn/components/theme-provider";
import type { Metadata } from "next";
import { type ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Template",
};

type Props = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ToasterWrapper />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
