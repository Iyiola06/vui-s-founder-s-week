import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { JsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl, siteConfig } from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const socialImage = absoluteUrl(siteConfig.ogImagePath);

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  creator: siteConfig.organizer.name,
  publisher: siteConfig.organizer.name,
  keywords: [...siteConfig.keywords],
  category: 'event',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
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
    title: siteConfig.name,
    description: siteConfig.description,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/icon', sizes: '512x512', type: 'image/png' }],
    shortcut: ['/icon'],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#0F5132',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: siteConfig.organizer.name,
    url: siteConfig.organizer.url,
    logo: absoluteUrl('/venite-logo.png'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.venue.addressLocality,
      addressRegion: siteConfig.venue.addressRegion,
      addressCountry: siteConfig.venue.addressCountry,
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.baseUrl,
    description: siteConfig.description,
    publisher: {
      '@type': 'CollegeOrUniversity',
      name: siteConfig.organizer.name,
    },
  };

  return (
    <html lang="en-NG" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-cream text-text-dark" suppressHydrationWarning>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
