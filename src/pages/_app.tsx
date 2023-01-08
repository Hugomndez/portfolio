import { Space_Grotesk } from '@next/font/google';
import type { AppProps } from 'next/app';
import 'styles/globals.css';

const font = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={font.className}>
      <Component {...pageProps} />
    </div>
  );
}
