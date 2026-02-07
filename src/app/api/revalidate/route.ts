import { env } from '@/utils/env/env.server';
import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const secret = requestHeaders.get('x-vercel-reval-key');

  if (secret !== env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  revalidateTag('projectsCollection', { expire: 0 });

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
