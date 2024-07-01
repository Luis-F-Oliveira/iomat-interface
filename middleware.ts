import type { NextRequest } from "next/server"
import CryptoJS from 'crypto-js'

export function middleware(req: NextRequest) {
  const electronToken = req.cookies.get('application')?.value
  const authToken = req.cookies.get('auth-token')?.value
  const plaintext = process.env.APP_KEY
  let electron = false

  if (electronToken && plaintext) {
    const decryptedKey = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(electronToken));
    
    if (decryptedKey === plaintext) {
      electron = true
    }
}

  if (!authToken && electron && !req.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', req.url))
  }

  if (authToken && electron && !req.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/dashboard/overview/analytics', req.url))
  }

  if (electron === false && !req.nextUrl.pathname.startsWith('/not-application')) {
    return Response.redirect(new URL('/not-application', req.url))
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}