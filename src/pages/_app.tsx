import { spaceGrotesk } from 'fonts';
import { type AppProps } from 'next/app';
import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style
        jsx
        global>{`
        html {
          font-family: ${spaceGrotesk.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
