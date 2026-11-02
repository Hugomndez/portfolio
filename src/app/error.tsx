'use client';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => (
  <div>
    <h2>Something went wrong! {error.message}</h2>
    <button onClick={reset}>Try again</button>
  </div>
);

export default Error;
