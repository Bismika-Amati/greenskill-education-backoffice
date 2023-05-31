// export { default } from "next-auth/middleware";
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const user = req.nextauth.token;

    if (req.nextUrl.pathname.startsWith('/dashboard') && !user?.accessToken) {
      return NextResponse.rewrite(new URL('/?message=You Are Not Authorized!', req.url));
    }
    // if (req.nextUrl.pathname.startsWith('/user') && req.nextauth.token?.role !== 'user')
    //   return NextResponse.rewrite(new URL('/auth/login?message=You Are Not Authorized!', req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ['/dashboard/:path*'],
};
