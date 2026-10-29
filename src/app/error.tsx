'use client';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => (
  <div>
    <h2>Something went wrong! {error.message}</h2>
    <button onClick={reset}>Try again</button>
  </div>
);

export default Error;
