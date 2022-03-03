import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  const url = req.nextUrl.clone()
  const { pathname } = req.nextUrl

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  if (!token && pathname !== '/login') {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
}
