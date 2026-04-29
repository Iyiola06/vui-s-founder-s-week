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
  name: "Venite University Founder's Week 2026",
  shortName: "Founder's Week 2026",
  description:
    "Official Venite University Founder's Week portal with the event programme, dinner and awards details, and secure student voting.",
  baseUrl,
  locale: 'en_NG',
  ogImagePath: '/opengraph-image',
  organizer: {
    name: 'Venite University',
    url: baseUrl,
  },
  venue: {
    name: 'Venite University, Iloro-Ekiti',
    addressLocality: 'Iloro-Ekiti',
    addressRegion: 'Ekiti',
    addressCountry: 'NG',
  },
  eventWindow: {
    startDate: '2026-05-11T09:00:00+01:00',
    endDate: '2026-05-17T18:00:00+01:00',
    dinnerDate: '2026-05-16T19:00:00+01:00',
  },
  keywords: [
    "Venite University Founder's Week",
    "Venite University Founder's Week 2026",
    'Venite University Iloro-Ekiti',
    "Founder's Week programme",
    'Venite dinner and awards voting',
    'student voting portal Nigeria',
    'Ekiti university events',
  ],
} as const;

export const publicRoutes = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/programme', changeFrequency: 'daily', priority: 0.9 },
  { path: '/voting', changeFrequency: 'hourly', priority: 0.9 },
  { path: '/dinner-night', changeFrequency: 'weekly', priority: 0.85 },
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

function parseTimeLabel(value?: string) {
  if (!value) {
    return null;
  }

  const normalizedValue = value.trim();
  const twelveHourMatch = normalizedValue.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);

  if (twelveHourMatch) {
    const [, hoursText, minutesText = '00', meridiem] = twelveHourMatch;
    const normalizedHours = Number.parseInt(hoursText, 10) % 12;

    return {
      hours: normalizedHours + (meridiem.toUpperCase() === 'PM' ? 12 : 0),
      minutes: Number.parseInt(minutesText, 10),
    };
  }

  const twentyFourHourMatch = normalizedValue.match(/^(\d{1,2})(?::(\d{2}))$/);

  if (twentyFourHourMatch) {
    const [, hoursText, minutesText = '00'] = twentyFourHourMatch;

    return {
      hours: Number.parseInt(hoursText, 10),
      minutes: Number.parseInt(minutesText, 10),
    };
  }

  return null;
}

function padTimePart(value: number) {
  return value.toString().padStart(2, '0');
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

  const startYear = getFormatter({ year: 'numeric' }).format(startDate);
  const endYear = getFormatter({ year: 'numeric' }).format(endDate);
  const startMonth = getFormatter({ month: 'long' }).format(startDate);
  const endMonth = getFormatter({ month: 'long' }).format(endDate);

  if (startYear === endYear && startMonth === endMonth) {
    const startDay = getFormatter({ day: 'numeric' }).format(startDate);
    const endDay = getFormatter({ day: 'numeric' }).format(endDate);

    return `${startMonth} ${startDay} to ${endDay}, ${startYear}`;
  }

  if (startYear === endYear) {
    return `${formatEventDate(startDate, { month: 'long', day: 'numeric' })} to ${formatEventDate(endDate, { month: 'long', day: 'numeric', year: 'numeric' })}`;
  }

  return `${formatEventDate(startDate)} to ${formatEventDate(endDate)}`;
}

export function buildLagosDateTime(value: Date | string, timeLabel?: string) {
  const date = resolveDateValue(value);
  const dateParts = getFormatter({
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const partMap = Object.fromEntries(
    dateParts
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value])
  );
  const parsedTime = parseTimeLabel(timeLabel) ?? { hours: 19, minutes: 0 };

  return `${partMap.year}-${partMap.month}-${partMap.day}T${padTimePart(parsedTime.hours)}:${padTimePart(parsedTime.minutes)}:00+01:00`;
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
