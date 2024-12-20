export const projectsCollectionQuery = `
{
  projectsCollection(order: displayOrder_ASC) {
    items {
      _id
      title
      techStack
      liveSiteUrl
      sourceCodeUrl
      image {
        url
        width
        height
        contentType
        fileName
        title
      }
    }
  }
}
`;
