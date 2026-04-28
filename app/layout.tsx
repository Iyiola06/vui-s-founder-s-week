import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
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

export const metadata: Metadata = {
  title: "Venite University Founder's Week",
  description: "Official portal for Venite University Iloro-Ekiti Founder's Week, featuring schedules and student voting.",
  icons: {
    icon: "/venite-logo.png",
    shortcut: "/venite-logo.png",
    apple: "/venite-logo.png",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-cream text-text-dark" suppressHydrationWarning>
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
