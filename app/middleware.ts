import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/account']
const publicRoutes = ['/auth', '/']
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname

  // This deployment is a dedicated giving experience. Keep the giving form
  // and its payment/receipt journey reachable, and send other site pages home.
  const isGivingFlow = path === '/' || path.startsWith('/give-now')
  if (!isGivingFlow) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value
 
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }
 
  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    cookie &&
    !req.nextUrl.pathname.startsWith('/')
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?)$).*)'],
}
