import { env } from '@/utils/env/env.server';
import { getPixels } from '@unpic/pixels';
import { blurhashToDataUri } from '@unpic/placeholder';
import { encode } from 'blurhash';
import { projectsCollectionQuery } from './contentful.queries';
import type { GraphQLError, ProjectsCollectionResponse, Variables } from './contentful.types';

const CONTENTFUL_API_URL = `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}`;

const getAccessToken = (variables: Partial<Variables>) => {
  if ('preview' in variables && variables.preview) {
    return env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  }
  return env.CONTENTFUL_DELIVERY_ACCESS_TOKEN;
};

const fetchContentfulData = async <T>(
  query: string,
  variables: Partial<Variables> = {}
): Promise<T> => {
  const response = await fetch(CONTENTFUL_API_URL, {
    next: { revalidate: 3600 }, // Do i need to revalidate only on production?
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken(variables)}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`); // throwing here but not catching later fix later
  }

  const data = (await response.json()) as T & { errors?: GraphQLError[] };

  if (data.errors && data.errors.length > 0) {
    throw new Error(`Failed to fetch data`); // throwing here but not catching later fix later
  }

  return data;
};

async function getImageBlurData(imageUrl: string) {
  const jpgData = await getPixels(`${imageUrl}?w=100&fm=jpg`);
  const data = Uint8ClampedArray.from(jpgData.data);
  const blurhash = encode(data, jpgData.width, jpgData.height, 4, 4);
  const base64ImageUri = blurhashToDataUri(blurhash);

  return base64ImageUri;
}

export const getProjects = async () => {
  const { data } = await fetchContentfulData<ProjectsCollectionResponse>(projectsCollectionQuery);

  const projects = await Promise.all(
    data.projectsCollection.items.map(async (item) => {
      const base64ImageUri = await getImageBlurData(item.image.url);

      return {
        id: item._id,
        title: item.title,
        techStack: item.techStack,
        liveSiteUrl: item.liveSiteUrl,
        sourceCodeUrl: item.sourceCodeUrl,
        image: {
          url: item.image.url,
          blurDataUrl: base64ImageUri,
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
