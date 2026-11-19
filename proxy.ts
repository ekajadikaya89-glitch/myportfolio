import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale, LOCALE_COOKIE } from '@/i18n/config'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split('/')[1] ?? ''

  if (isLocale(firstSegment)) return NextResponse.next()

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const locale = cookieLocale && isLocale(cookieLocale) ? cookieLocale : defaultLocale

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    '/((?!api|_next|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
}
