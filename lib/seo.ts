import type { Metadata } from 'next';

type MetadataOptions = {
  title?: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: 'website' | 'article';
};

const FALLBACK_BASE_URL = 'http://localhost:3000';
const LAGOS_TIME_ZONE = 'Africa/Lagos';

function normalizeBaseUrl(value?: string) {
  if (!value) {
    return FALLBACK_BASE_URL;
  }

  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;

  try {
    return new URL(withProtocol).toString().replace(/\/$/, '');
  } catch {
    return FALLBACK_BASE_URL;
  }
}

const baseUrl = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_APP_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL
);

export const siteConfig = {
  name: 'SPRF | Student Programmer Representative Forum, Venite University',
  shortName: 'SPRF Venite',
  description:
    'Your official guide to SPRF orientation, student arrival, campus directions, announcements, and essential information for Venite University, Iloro-Ekiti.',
  baseUrl,
  locale: 'en_NG',
  ogImagePath: '/opengraph-image',
  organizer: {
    name: 'SPRF — Student Programmer Representative Forum',
    institution: 'Venite University',
    url: baseUrl,
  },
  venue: {
    name: 'Venite University Campus',
    streetAddress: 'KM 2, Ayetoro Road',
    addressLocality: 'Iloro-Ekiti',
    addressRegion: 'Ekiti State',
    addressCountry: 'NG',
  },
  eventWindow: {
    startDate: '2026-11-16T08:00:00+01:00',
    endDate: '2026-11-21T18:00:00+01:00',
    dinnerDate: '2026-11-21T18:00:00+01:00',
  },
  keywords: [
    'SPRF Venite University',
    'Student Programmer Representative Forum',
    'Venite University orientation 2026',
    'Venite University freshers arrival',
    'Iloro-Ekiti campus directions',
    'student arrival guide Nigeria',
    'Venite University timetable',
    'Venite University student portal',
    'SPRF coding community',
    'Ekiti state university orientation',
  ],
} as const;

export const publicRoutes = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: '/orientation', changeFrequency: 'daily', priority: 0.9 },
  { path: '/orientation/schedule', changeFrequency: 'daily', priority: 0.9 },
  { path: '/travel', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/travel/transport', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/freshers-guide', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/checklist', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/announcements', changeFrequency: 'daily', priority: 0.85 },
  { path: '/faq', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/leadership', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.4 },
] as const;

export function absoluteUrl(path = '/') {
  return new URL(path, `${siteConfig.baseUrl}/`).toString();
}

function resolveDateValue(value: Date | string) {
  return value instanceof Date ? value : new Date(value);
}

function getFormatter(options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en-NG', {
    timeZone: LAGOS_TIME_ZONE,
    ...options,
  });
}

export function formatEventDate(
  value: Date | string,
  options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }
) {
  return getFormatter(options).format(resolveDateValue(value));
}

export function formatEventDateRange(startValue: Date | string, endValue: Date | string) {
  const startDate = resolveDateValue(startValue);
  const endDate = resolveDateValue(endValue);
  const startDay = getFormatter({ day: 'numeric' }).format(startDate);
  const endDay = getFormatter({ day: 'numeric' }).format(endDate);
  const month = getFormatter({ month: 'long' }).format(startDate);
  const year = getFormatter({ year: 'numeric' }).format(startDate);
  return `${month} ${startDay} – ${endDay}, ${year}`;
}

export function buildLagosDateTime(value: Date | string, timeLabel?: string) {
  const date = resolveDateValue(value);
  return date.toISOString();
}

function createRobots(noIndex = false): NonNullable<Metadata['robots']> {
  if (noIndex) {
    return {
      index: false,
      follow: false,
      noarchive: true,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        nosnippet: true,
      },
    };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

export function createMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  noIndex = false,
  type = 'website',
}: MetadataOptions): Metadata {
  const socialImage = absoluteUrl(siteConfig.ogImagePath);
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;

  return {
    title: path === '/' ? { absolute: resolvedTitle } : title,
    description,
    keywords: [...new Set([...siteConfig.keywords, ...keywords])],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} social preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: [socialImage],
    },
    robots: createRobots(noIndex),
  };
}

export function createBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
