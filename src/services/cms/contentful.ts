import { getPlaiceholder } from 'plaiceholder';
import { projectsCollectionQuery } from './contentful.queries';
import { ProjectsCollectionResponse, Variables } from './contentful.types';

if (
  !process.env.CONTENTFUL_SPACE_ID ||
  !process.env.CONTENTFUL_ENVIRONMENT ||
  !process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN ||
  !process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
) {
  throw new Error('Missing Contentful environment variables');
}

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  CONTENTFUL_DELIVERY_ACCESS_TOKEN,
} = process.env;

const CONTENTFUL_API_URL = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}`;

const getAccessToken = (variables: Partial<Variables>) => {
  if ('preview' in variables && variables.preview) {
    return CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  }
  return CONTENTFUL_DELIVERY_ACCESS_TOKEN;
};

const fetchContentfulData = async <T>(
  query: string,
  variables: Partial<Variables> = {}
): Promise<T> => {
  const response = await fetch(CONTENTFUL_API_URL, {
    next: { revalidate: 3600 },
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken(variables)}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  return data;
};

const fetchImageBuffer = async (url: string): Promise<Buffer> => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
};

export const getProjects = async () => {
  const { data } = await fetchContentfulData<ProjectsCollectionResponse>(projectsCollectionQuery);

  const projects = await Promise.all(
    data.projectsCollection.items.map(async (item) => {
      const buffer = await fetchImageBuffer(item.image.url);
      const { base64 } = await getPlaiceholder(buffer, {
        size: 4,
        lightness: 10,
        format: ['webp'],
      });

      return {
        id: item._id,
        title: item.title,
        techStack: item.techStack,
        liveSiteUrl: item.liveSiteUrl,
        sourceCodeUrl: item.sourceCodeUrl,
        image: {
          url: item.image.url,
          blurDataUrl: base64,
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
