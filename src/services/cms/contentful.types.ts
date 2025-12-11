export type GraphQLError = {
  message: string; // Human readable error message
  extensions?: ContentfulGraphQLErrorExtensions; // Vendor-specific error metadata
};

export type ContentfulGraphQLErrorExtensions = {
  contentful: {
    code: string; // unique error identifier.
    requestId: string; // unique request identifier.
    // details: optional object with details about a specific kind of error.
  };
};

export type Variables = {
  preview: boolean;
  locale: string;
};

export type Project = {
  _id: string;
  title: string;
  techStack: string[];
  liveSiteUrl: string;
  sourceCodeUrl: string | null;
  image: {
    url: string;
    width: number;
    height: number;
    contentType: string;
    fileName: string;
    title: string;
  };
};

export type ProjectsCollectionResponse = {
  data: {
    projectsCollection: {
      items: Project[];
    };
  };
};
