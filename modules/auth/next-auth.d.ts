import NextAuth from 'next-auth';
import { TUserResponse } from '../master-data/users/entities';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: TAuthResponse;
  }

  interface User extends TUserResponse {
    accessToken: string;
  }
}
