import 'server-only';

import env from '@/utils/env/env.server';
import { getPixels } from '@unpic/pixels';
import { blurhashToDataUri } from '@unpic/placeholder';
import { encode } from 'blurhash';
import projectsCollectionQuery from './contentful.queries';
import type {
  ContentfulResult,
  ProjectWithBlur,
  ProjectsCollectionResponse,
  Variables,
  WithErrors,
} from './contentful.types';

const CONTENTFUL_API_URL = `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}`;

function getAccessToken(variables: Partial<Variables>) {
  if ('preview' in variables && variables.preview) {
    return env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  }

  return env.CONTENTFUL_DELIVERY_ACCESS_TOKEN;
}

async function fetchContentfulData<T>(
  query: string,
  variables: Partial<Variables> = {},
  operation = 'unknown',
): Promise<ContentfulResult<T>> {
  try {
    const response = await fetch(CONTENTFUL_API_URL, {
      body: JSON.stringify({ query, variables }),
      headers: {
        Authorization: `Bearer ${getAccessToken(variables)}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!response.ok) {
      const bodyText = await response.text().catch(() => '<unreadable>');
      console.error('Contentful fetch non-2xx', {
        bodyText,
        operation,
        status: response.status,
        statusText: response.statusText,
      });

      throw new Error('Failed to fetch from Contentful');
    }

    const data = (await response.json()) as unknown as WithErrors<T>;

    if (Array.isArray(data.errors) && data.errors.length > 0) {
      const messages = data.errors.map((error) => error.message).filter(Boolean);
      const ext = data.errors[0]?.extensions?.contentful;
      console.warn('Contentful GraphQL errors', {
        code: ext?.code,
        messages,
        operation,
        requestId: ext?.requestId,
      });

      throw new Error(`Contentful GraphQL errors: ${messages.join('; ')}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Contentful fetch error', {
        operation,
        cause: error,
      });
      throw new Error('Contentful request failed: ', { cause: error });
    }

    throw new Error('Contentful request failed with unknown error', { cause: error });
  }
}

const FALLBACK_BLUR_DATA_URL =
  'data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAAKRYaKhobLiEeMSghMisiMSggLSEcKRcZKRoaLiIeODAmQDssQz4uQDorNy8kLSAbKR4aMikhQTsuTUg3UUw6TEY2QDksMScfKiAaNCsjRj4yU0s+V09BUUo8RDwwMyohKx8aMykiQzkxT0Y8U0lATkQ7QjgwMicgLBwaMSMfOy8qQzgyRjw1QzgxOi4oLyEdLBkaLhwbMCIeMyghNCoiMyggMCIdLBkZLRcaLBgZKxwXKh8VKiEUKyAUKxsWKhYX';

async function getImageBlurData(imageUrl: string) {
  const jpgData = await getPixels(`${imageUrl}?w=100&fm=jpg`);
  const data = Uint8ClampedArray.from(jpgData.data);
  const blurhash = encode(data, jpgData.width, jpgData.height, 4, 4);
  const base64ImageUri = blurhashToDataUri(blurhash);

  return base64ImageUri;
}

async function GetProjects(): Promise<ContentfulResult<ProjectWithBlur[]>> {
  const result = await fetchContentfulData<ProjectsCollectionResponse>(
    projectsCollectionQuery,
    {},
    'projectsCollection',
  );

  const { items } = result.data.projectsCollection;

  const projects = await Promise.all(
    items.map(async (item) => {
      let blurDataUrl: `data:image/bmp;base64,${string}` | undefined = undefined;

      try {
        blurDataUrl = await getImageBlurData(item.image.url);
      } catch (error) {
        console.warn('Blurhash generation failed for image', {
          service: 'contentful',
          operation: 'projectsCollection',
          imageUrl: item.image.url,
          cause: String(error instanceof Error ? error.message : error),
        });
      }

      return {
        _id: item._id,
        title: item.title,
        liveSiteUrl: item.liveSiteUrl,
        sourceCodeUrl: item.sourceCodeUrl,
        techStack: item.techStack,
        image: {
          blurDataUrl: blurDataUrl ?? FALLBACK_BLUR_DATA_URL,
          contentType: item.image.contentType,
          fileName: item.image.fileName,
          height: item.image.height,
          title: item.image.title,
          url: item.image.url,
          width: item.image.width,
        },
      };
    }),
  );

  return projects;
}

export default GetProjects;
