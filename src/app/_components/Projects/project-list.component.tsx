import { getProjects } from '@/services/cms/contentful';
import { cacheLife, cacheTag } from 'next/cache';
import { ProjectCard } from './project-card.component';

async function ProjectList() {
  'use cache';
  cacheTag('projectsCollection');
  cacheLife('max');

  const projects = await getProjects();

  return (
    <>
      {projects.map((p) => (
        <ProjectCard
          key={p._id}
          project={p}
        />
      ))}
    </>
  );
}

export default ProjectList;
