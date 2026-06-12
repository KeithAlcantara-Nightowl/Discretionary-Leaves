import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Slug scheme (Airtable-formula friendly):
//   epoch seconds + SECRET_OFFSET, then each digit replaced by a letter:
//   0→k 1→r 2→d 3→x 4→m 5→q 6→z 7→p 8→w 9→f
//   e.g. 2026-05-21T15:45:30Z → 1779723930 → +offset → "rpwwkqxzxf"
const SECRET_OFFSET = 8675309;
const LETTER_TO_DIGIT: Record<string, string> = {
  k: '0', r: '1', d: '2', x: '3', m: '4',
  q: '5', z: '6', p: '7', w: '8', f: '9',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const match = pathname.match(/^\/v\/([krdxmqzpwf]{9,11})$/);

  if (match) {
    const digits = match[1]
      .split('')
      .map((c) => LETTER_TO_DIGIT[c])
      .join('');

    const epochSeconds = parseInt(digits, 10) - SECRET_OFFSET;
    const slugDate = new Date(epochSeconds * 1000);
    const now = new Date();

    // Invalid decode, implausibly old, or future-dated → 404
    if (
      epochSeconds <= 0 ||
      isNaN(slugDate.getTime()) ||
      slugDate.getFullYear() < 2024 ||
      slugDate.getTime() > now.getTime() + 24 * 60 * 60 * 1000
    ) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    // Older than 60 days → expired
    const diffDays = (now.getTime() - slugDate.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays > 60) {
      return NextResponse.rewrite(new URL(`${pathname}?expired=true`, request.url));
    }
  }

  return NextResponse.next();
}

// Ensure middleware only matches routing structures beginning with /v/
export const config = {
  matcher: '/v/:path*',
};
