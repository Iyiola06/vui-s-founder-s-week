import type { Metadata } from 'next';
import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { logDatabaseIssue } from '@/lib/db';
import { JsonLd } from '@/components/seo/JsonLd';
import VotingClient from './VotingClient';
import { FloatingNav } from '@/components/ui/FloatingNav';
import { Footer } from '@/components/ui/Footer';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { createBreadcrumbJsonLd, createMetadata, siteConfig } from '@/lib/seo';

export const revalidate = 60;

export const metadata: Metadata = createMetadata({
  title: 'Dinner and Awards Voting',
  description:
    "Vote securely for Venite University's Founder's Week dinner and awards categories with Paystack-powered payments and verified results.",
  path: '/voting',
  keywords: [
    'Venite University voting',
    'dinner and awards voting',
    'Paystack student voting',
  ],
});

export default async function VotingPage() {
  let categories: any[] = [];
  let isDbConnected = true;

  try {
    categories = await prisma.votingCategory.findMany({
      where: { isOpen: true },
      include: {
        candidates: {
          orderBy: { voteCount: 'desc' }
        }
      },
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    logDatabaseIssue('voting page data', error);
    isDbConnected = false;
  }

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Voting', path: '/voting' },
  ]);
  const votingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Venite University Founder's Week Dinner and Awards Voting",
    description:
      'Secure voting portal for Founder\'s Week dinner and awards categories.',
    url: `${siteConfig.baseUrl}/voting`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categories.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: category.name,
          description:
            category.description ??
            `${category.candidates.length} nominees available in this category.`,
        },
      })),
    },
  };

  return (
    <div className="w-full min-h-screen bg-cream text-text-dark font-sans overflow-x-hidden selection:bg-champagne-gold selection:text-text-dark">
      <FloatingNav />
      <main>
        <JsonLd data={[breadcrumbJsonLd, votingJsonLd]} />

        {/* Hero */}
        <section className="relative pt-40 pb-20 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[600px] h-[60vw] max-h-[600px] radial-glow rounded-full opacity-40 pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-warm-border bg-white/30 backdrop-blur-md mb-8 z-10">
          <Award className="w-4 h-4 text-champagne-gold" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-text-dark/80">Saturday Grand Finale</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif text-text-dark tracking-tighter mb-6 z-10">
          Dinner & Awards <span className="italic text-deep-green">Voting</span>
        </h1>
        
        <div className="max-w-2xl mx-auto flex flex-col gap-2 text-sm text-muted-text z-10 font-medium">
          <p>Cast secure Founder&apos;s Week 2026 votes for your preferred Venite University nominees.</p>
          <p>1. Select an award category below.</p>
          <p>2. Choose your preferred candidate and enter the number of votes you wish to purchase.</p>
          <p>3. Pay securely via Paystack. Note: Your vote counts ONLY after payment verification.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-12 z-10">
          <div className="glass-panel px-6 py-4 rounded-full flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-warm-border"><Award className="w-4 h-4 text-deep-green" /></div>
             <div className="flex flex-col text-left">
               <span className="text-xl font-serif text-text-dark leading-none">{categories.length}</span>
               <span className="text-[10px] uppercase tracking-widest font-bold text-muted-text">Active Categories</span>
             </div>
          </div>
          <div className="glass-panel px-6 py-4 rounded-full flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-champagne-gold/10 flex items-center justify-center border border-champagne-gold/30"><CheckCircle2 className="w-4 h-4 text-champagne-gold" /></div>
             <div className="flex flex-col text-left">
               <span className="text-xl font-serif text-text-dark leading-none">Verified</span>
               <span className="text-[10px] uppercase tracking-widest font-bold text-muted-text">Real-time Results</span>
             </div>
          </div>
          <div className="glass-panel px-6 py-4 rounded-full flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-warm-border"><ShieldCheck className="w-4 h-4 text-deep-green" /></div>
             <div className="flex flex-col text-left">
               <span className="text-xl font-serif text-text-dark leading-none">Paystack</span>
               <span className="text-[10px] uppercase tracking-widest font-bold text-muted-text">Secure Payments</span>
             </div>
          </div>
        </div>
        </section>

        <section className="px-6 pb-32 max-w-7xl mx-auto min-h-[50vh]">
          {!isDbConnected && (
            <div className="bg-red-50 text-red-800 px-6 py-4 rounded-xl text-center text-sm font-medium mb-12 border border-red-200">
              Please configure the DATABASE_URL in the Secrets panel to connect to your Neon Postgres database.
            </div>
          )}

          {isDbConnected ? (
            <Suspense fallback={<div className="text-center py-20 text-muted-text glass-panel rounded-3xl">Loading voting portal...</div>}>
              <VotingClient initialCategories={categories} />
            </Suspense>
          ) : (
            <div className="text-center py-20 text-muted-text glass-panel rounded-3xl">
              Database connection required to load voting data.
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
