import { NextResponse, NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {

  const token = await getToken({ req: request })
  const path = request.nextUrl

  if (token && (
    path.pathname.startsWith("/signin") ||
    path.pathname.startsWith("/signup") ||
    path.pathname.startsWith("/verify") ||
    path.pathname.startsWith("/")
  )) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  if(!token && path.pathname.startsWith("/dashboard")){
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next()

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/",
    "/dashboard/:path*",
    "/verify/:path*",
  ],
}