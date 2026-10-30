import type { MetadataRoute } from 'next';
import { absoluteUrl, publicRoutes, siteConfig } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  return publicRoutes.map((route) => {
    return {
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    };
  });
}
