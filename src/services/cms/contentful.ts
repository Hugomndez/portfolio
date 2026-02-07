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

const fetchContentfulData = async <T>(
  query: string,
  variables: Partial<Variables> = {},
  operation = 'unknown'
): Promise<ContentfulResult<T>> => {
  try {
    const response = await fetch(CONTENTFUL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken(variables)}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      const bodyText = await response.text().catch(() => '<unreadable>');
      console.error('Contentful fetch non-2xx', {
        operation,
        status: response.status,
        statusText: response.statusText,
        bodyText,
      });

      throw new Error('Failed to fetch from Contentful');
    }

    const data = (await response.json()) as unknown as WithErrors<T>;

    if (Array.isArray(data.errors) && data.errors.length > 0) {
      const messages = data.errors.map((e) => e.message).filter(Boolean);
      const ext = data.errors[0]?.extensions?.contentful;
      console.warn('Contentful GraphQL errors', {
        operation,
        requestId: ext?.requestId,
        code: ext?.code,
        messages,
      });

      throw new Error('Contentful GraphQL errors: ' + messages.join('; '));
    }

    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error('Contentful fetch error', {
        operation,
        cause: String(err instanceof Error ? err.message : err),
      });
      throw new Error('Contentful request failed: ' + err.message);
    }

    throw new Error('Contentful request failed with unknown error');
  }
};

const FALLBACK_BLUR_DATA_URL =
  'data:image/bmp;base64,Qk32BAAAAAAAADYAAAAoAAAACAAAAAgAAAABABgAAAAAAMAAAAATCwAAEwsAAAAAAAAAAAAAKRYaKhobLiEeMSghMisiMSggLSEcKRcZKRoaLiIeODAmQDssQz4uQDorNy8kLSAbKR4aMikhQTsuTUg3UUw6TEY2QDksMScfKiAaNCsjRj4yU0s+V09BUUo8RDwwMyohKx8aMykiQzkxT0Y8U0lATkQ7QjgwMicgLBwaMSMfOy8qQzgyRjw1QzgxOi4oLyEdLBkaLhwbMCIeMyghNCoiMyggMCIdLBkZLRcaLBgZKxwXKh8VKiEUKyAUKxsWKhYX';

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

  const items = result.data.projectsCollection.items;

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
        _id: item._id,
        title: item.title,
        techStack: item.techStack,
        liveSiteUrl: item.liveSiteUrl,
        sourceCodeUrl: item.sourceCodeUrl,
        image: {
          url: item.image.url,
          blurDataUrl: blurDataUrl ?? FALLBACK_BLUR_DATA_URL,
          width: item.image.width,
          height: item.image.height,
          contentType: item.image.contentType,
          fileName: item.image.fileName,
          title: item.image.title,
        },
      };
    })
  );

  return projects;
};
