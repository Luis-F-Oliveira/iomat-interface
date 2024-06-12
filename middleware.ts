import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const electronToken = req.cookies.get('application')?.value
  const authToken = req.cookies.get('auth')?.value

  if (!authToken && electronToken && !req.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', req.url))
  }

  if (authToken && electronToken && !req.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/dashboard/overview/analytics', req.url))
  }

  if (!electronToken && !req.nextUrl.pathname.startsWith('/not-application')) {
    return Response.redirect(new URL('/not-application', req.url))
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}