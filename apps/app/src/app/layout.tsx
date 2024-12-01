import ReactQueryProvider from "@/common/components/ReactQueryProvider";
import { ThemeProvider } from "@/common/components/ThemeProvider";
import { ToasterWrapper } from "@/common/components/ToasterWrapper";
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
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Next.js Template" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

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
