import { Logger } from "@nextjs-template/logging";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("auth_session");

  // Early return. Make sure to use `authenticatePage()` on individual pages in order to fully authenticate the user.
  if (pathname.startsWith("/admin") && !sessionCookie) {
    Logger.info("Unauthorized request to middleware", {
      requestUrl: request.url,
    });
    const requestUrl = new URL(request.url);
    return NextResponse.redirect(
      new URL(`/login?redirect_to=${requestUrl.pathname}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
