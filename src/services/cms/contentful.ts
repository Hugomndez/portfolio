import { env } from '@/utils/env/env.server';
import { getPixels } from '@unpic/pixels';
import { blurhashToDataUri } from '@unpic/placeholder';
import { encode } from 'blurhash';
import { projectsCollectionQuery } from './contentful.queries';
import type {
  ContentfulResult,
  ProjectsCollectionResponse,
  ProjectWithBlur,
  Variables,
  WithErrors,
} from './contentful.types';

const CONTENTFUL_API_URL = `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}`;

const getAccessToken = (variables: Partial<Variables>) => {
  if ('preview' in variables && variables.preview) {
    return env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  }
  return env.CONTENTFUL_DELIVERY_ACCESS_TOKEN;
};

const CONTENTFUL_TIMEOUT_MS = 5000;

const fetchContentfulData = async <T>(
  query: string,
  variables: Partial<Variables> = {},
  operation = 'unknown'
): Promise<ContentfulResult<T>> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CONTENTFUL_TIMEOUT_MS);
  const start = Date.now();

  try {
    const response = await fetch(CONTENTFUL_API_URL, {
      next: { tags: [`contentful-${operation}`] },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken(variables)}`,
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const bodyText = await response.text().catch(() => '<unreadable>');
      console.error('Contentful fetch non-2xx', {
        operation,
        status: response.status,
        statusText: response.statusText,
        bodyText,
        durationMs: Date.now() - start,
      });
      return { ok: false };
    }

    const data = (await response.json()) as unknown as WithErrors<T>;

    if (Array.isArray(data.errors) && data.errors.length > 0) {
      const messages = data.errors.map((e) => e.message).filter(Boolean);
      const ext = data.errors[0]?.extensions?.contentful;
      console.warn('Contentful GraphQL errors', {
        operation,
        durationMs: Date.now() - start,
        requestId: ext?.requestId,
        code: ext?.code,
        messages,
      });
      return { ok: false };
    }

    return { ok: true, data: data as T };
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('Contentful fetch timed out', {
        operation,
        durationMs: Date.now() - start,
        timeoutMs: CONTENTFUL_TIMEOUT_MS,
      });
      return { ok: false };
    }
    console.error('Contentful fetch error', {
      operation,
      durationMs: Date.now() - start,
      cause: String(err instanceof Error ? err.message : err),
    });
    return { ok: false };
  } finally {
    clearTimeout(timeout);
  }
};

async function getImageBlurData(imageUrl: string) {
  const jpgData = await getPixels(`${imageUrl}?w=100&fm=jpg`);
  const data = Uint8ClampedArray.from(jpgData.data);
  const blurhash = encode(data, jpgData.width, jpgData.height, 4, 4);
  const base64ImageUri = blurhashToDataUri(blurhash);

  return base64ImageUri;
}

export const getProjects = async (): Promise<ContentfulResult<ProjectWithBlur[]>> => {
  const result = await fetchContentfulData<ProjectsCollectionResponse>(
    projectsCollectionQuery,
    {},
    'projectsCollection'
  );

  if (!result.ok) {
    return { ok: false };
  }

  const items = result.data.data.projectsCollection.items;

  const projects = await Promise.all(
    items.map(async (item) => {
      let blurDataUrl: `data:image/bmp;base64,${string}` | undefined = undefined;
      try {
        blurDataUrl = await getImageBlurData(item.image.url);
      } catch (e) {
        console.warn('Blurhash generation failed for image', {
          service: 'contentful',
          operation: 'projectsCollection',
          imageUrl: item.image.url,
          cause: String(e instanceof Error ? e.message : e),
        });
      }

      return {
        id: item._id,
        title: item.title,
        techStack: item.techStack,
        liveSiteUrl: item.liveSiteUrl,
        sourceCodeUrl: item.sourceCodeUrl,
        image: {
          url: item.image.url,
          blurDataUrl,
          width: item.image.width,
          height: item.image.height,
          contentType: item.image.contentType,
          fileName: item.image.fileName,
          title: item.image.title,
        },
      };
    })
  );

  return { ok: true, data: projects };
};
