import type { AppProps } from 'next/app';

export default function App({ Component, TPageProps }: AppProps) {
  return <Component {...TPageProps} />;
}
