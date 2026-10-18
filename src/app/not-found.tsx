import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        alignContent: 'center',
        gap: '10px',
      }}>
      <h1>Not Found</h1>
      <p>Could not find requested resource.</p>
      <Link
        href='/'
        style={{ color: 'blue' }}>
        Return to home page
      </Link>
    </div>
  );
}
