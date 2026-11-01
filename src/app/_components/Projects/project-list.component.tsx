import { cacheLife, cacheTag } from 'next/cache';
import getProjects from '@/services/cms/contentful';

import { ProjectCard } from './project-card.component';

const ProjectList = async () => {
  'use cache';
  cacheTag('projectsCollection');
  cacheLife('max');

  const projects = await getProjects();

  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </>
  );
};

export default ProjectList;
