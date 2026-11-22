export const siteConfig = {
  name: 'Hugo Méndez - Full Stack Developer',
  author: 'Hugo Méndez',
  description:
    'Full Stack Developer helping businesses build, improve, and maintain fast, reliable web experiences. Specializing in modern web development with React, Next.js, TypeScript, and performance optimization.',
  url: 'https://hugomendez.dev',
  locale: 'en_US',
} as const;

export const ogImageUrl = `${siteConfig.url}/hugo-mendez-profile-photo-large-high-res.jpg` as const;
