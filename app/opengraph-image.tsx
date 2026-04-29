import { ImageResponse } from 'next/og';
import { logDatabaseIssue } from '@/lib/db';
import { prisma } from '@/lib/prisma';
import { formatEventDateRange, siteConfig } from '@/lib/seo';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
export const revalidate = 900;

export default async function OpenGraphImage() {
  let firstEventDate = new Date(siteConfig.eventWindow.startDate);
  let lastEventDate = new Date(siteConfig.eventWindow.endDate);

  try {
    const [firstEvent, lastEvent] = await Promise.all([
      prisma.eventDay.findFirst({
        orderBy: { date: 'asc' },
        select: { date: true },
      }),
      prisma.eventDay.findFirst({
        orderBy: { date: 'desc' },
        select: { date: true },
      }),
    ]);

    firstEventDate = firstEvent?.date ?? firstEventDate;
    lastEventDate = lastEvent?.date ?? lastEventDate;
  } catch (error) {
    logDatabaseIssue('open graph image data', error);
  }

  const eventDateRange = formatEventDateRange(firstEventDate, lastEventDate);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'linear-gradient(135deg, #0F5132 0%, #143D2E 50%, #1F211C 100%)',
          color: '#FDFCF8',
          padding: '56px',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontSize: 28,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: '#E5C76B',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#E5C76B',
            }}
          />
          Venite University, Iloro-Ekiti
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 880 }}>
          <div style={{ fontSize: 92, lineHeight: 1.02, fontWeight: 700 }}>
            Founder&apos;s Week 2026
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.35,
              fontFamily: 'Arial, sans-serif',
              color: 'rgba(253, 252, 248, 0.82)',
            }}
          >
            Official programme, dinner and awards details, and secure student
            voting for the Venite University community.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif',
            fontSize: 26,
            color: 'rgba(253, 252, 248, 0.8)',
          }}
        >
          <div>{eventDateRange}</div>
          <div>{siteConfig.baseUrl.replace(/^https?:\/\//, '')}</div>
        </div>
      </div>
    ),
    size
  );
}
