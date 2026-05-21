import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Track match parameters for target /v/YYYY-MM-DD structures
  const match = pathname.match(/^\/v\/(\d{4}-\d{2}-\d{2})$/);

  if (match) {
    const slugDateStr = match[1];
    const birthDate = new Date(slugDateStr);
    const today = new Date();

    // Check if URL string is a valid ISO date
    if (isNaN(birthDate.getTime())) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    // Calculate absolute difference in timestamps mapped directly to day lengths
    const diffTime = today.getTime() - birthDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    // If version is older than 60 days, return expired status / error
    if (diffDays > 60) {
      // Rewrite to an explicit internal expiry view inside the slug router
      return NextResponse.rewrite(new URL(`${pathname}?expired=true`, request.url));
    }
  }

  return NextResponse.next();
}

// Ensure middleware only matches routing structures beginning with /v/
export const config = {
  matcher: '/v/:path*',
};
