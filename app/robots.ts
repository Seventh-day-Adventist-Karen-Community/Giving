import { MetadataRoute } from 'next';
const host = 'https://www.sdackc.org'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account/*', '/give-now/receipt/*','/give-now/confirm/*'],
    },
    sitemap: `${host}/sitemap.xml`,
  };
}
