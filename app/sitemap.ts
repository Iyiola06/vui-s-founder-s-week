import type { MetadataRoute } from 'next';
import { logDatabaseIssue } from '@/lib/db';
import { prisma } from '@/lib/prisma';
import { absoluteUrl, publicRoutes, siteConfig } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let latestProgrammeUpdate: Date | undefined;
  let latestVotingUpdate: Date | undefined;

  try {
    const [eventDay, votingCategory] = await Promise.all([
      prisma.eventDay.findFirst({
        orderBy: { updatedAt: 'desc' },
        select: { updatedAt: true },
      }),
      prisma.votingCategory.findFirst({
        orderBy: { updatedAt: 'desc' },
        select: { updatedAt: true },
      }),
    ]);

    latestProgrammeUpdate = eventDay?.updatedAt;
    latestVotingUpdate = votingCategory?.updatedAt;
  } catch (error) {
    logDatabaseIssue('sitemap data', error);
  }

  const fallbackUpdatedAt = new Date(siteConfig.eventWindow.startDate);

  return publicRoutes.map((route) => {
    const lastModified =
      route.path === '/programme'
        ? latestProgrammeUpdate ?? fallbackUpdatedAt
        : route.path === '/voting'
          ? latestVotingUpdate ?? fallbackUpdatedAt
          : route.path === '/dinner-night'
            ? latestVotingUpdate ?? latestProgrammeUpdate ?? fallbackUpdatedAt
            : latestVotingUpdate ?? latestProgrammeUpdate ?? fallbackUpdatedAt;

    return {
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    };
  });
}
