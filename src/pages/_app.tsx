import { type AppProps } from 'next/app';
import { Space_Grotesk } from 'next/font/google';
import 'styles/globals.css';

const font = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style
        jsx
        global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
