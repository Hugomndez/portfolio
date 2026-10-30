'use client';

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <html lang="en">
    <body>
      <h2>Something went wrong! {error.message}</h2>
      <button onClick={reset}>Try again</button>
    </body>
  </html>
);

export default GlobalError;
