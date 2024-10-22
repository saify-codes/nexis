import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
    '/',
    '/dashboard',
    '/users'
]

const authRoutes = [
    '/signin',
    '/signup',
]

export default function (request: NextRequest) {
    
    const token = request.cookies.get('auth-token');

    if(!token && protectedRoutes.includes(request.nextUrl.pathname)){
        return NextResponse.redirect(new URL('/signin', request.url))
    }
    
    if(token && authRoutes.includes(request.nextUrl.pathname)){
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()

}