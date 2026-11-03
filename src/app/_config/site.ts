export const siteConfig = {
  name: 'Hugo Méndez - Full Stack Developer',
  author: 'Hugo Méndez',
  description:
    'Personal developer portfolio showcasing my skills on HTML, CSS, JavaScript, TypeScript, React, NextJS, Web Performance, SEO and more...',
  url: 'https://hugomendez.dev',
  locale: 'en_US',
} as const;

export const ogImageUrl = `${siteConfig.url}/hugo-mendez-profile-photo-large-high-res.jpg` as const;
