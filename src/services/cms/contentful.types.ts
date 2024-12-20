export interface Variables {
  preview: boolean;
  locale: string;
}

export interface Project {
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
}

export interface ProjectsCollectionResponse {
  data: {
    projectsCollection: {
      items: Project[];
    };
  };
}
