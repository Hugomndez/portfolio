export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Hugomndez' },
  { name: 'Frontend Mentor', url: 'https://www.frontendmentor.io/profile/Hugomndez' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/hugomndez/' },
  { name: 'Instagram', url: 'https://www.instagram.com/hugomndez/' },
] as const;

export type SocialLinkName = (typeof socialLinks)[number]['name'];
