import { headers } from 'next/headers';
import Link from 'next/link';

export default async function NotFound() {
  const headersList = await headers();
  const referer = headersList.get('referer') || 'unknown domain';
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
      <h1>Not Found: {referer}</h1>
      <p>Could not find requested resource.</p>
      <Link
        href='/'
        style={{ color: 'blue' }}>
        Return to home page
      </Link>
    </div>
  );
}
