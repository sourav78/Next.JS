import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname

    const publicPath = path === "/auth/login" || path === "/auth/signup" || path === "/auth/verifyemail"

    const token = request.cookies.get("token")?.value || ""

    if(publicPath && token){
        return NextResponse.redirect(new URL('/auth/profile', request.url))
     }
    
    if(!publicPath && !token){
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/auth/login',
    '/auth/signup',
    '/auth/verifyemail',
    '/auth/profile'
  ],
}