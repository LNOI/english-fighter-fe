import { NextResponse ,NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware';
import {localePrefix, defaultLocale, locales, pathnames} from './config';

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
  pathnames
});
 
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('authjs.session-token')?.value

  if (accessToken && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
export const config = {
  matcher: ['/', '/(vi|en)/:path*','/((?!_next|_vercel|.*\\..*).*)'],
}