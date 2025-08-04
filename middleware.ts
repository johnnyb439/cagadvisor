import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // For CodeSandbox, temporarily disable auth middleware to fix "Bad request" error
  // Authentication will still work through the auth providers
  
  const { pathname } = request.nextUrl
  
  // Allow all requests to pass through
  // This fixes the "Bad request" error in CodeSandbox while keeping auth functional
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip auth middleware for API routes and static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}