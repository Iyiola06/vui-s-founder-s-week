'use server';

import { logDatabaseIssue, isDatabaseConnectivityError } from '@/lib/db';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

async function runAdminMutation(context: string, mutation: () => Promise<void>) {
  try {
    await mutation();
  } catch (error) {
    logDatabaseIssue(context, error);
    if (isDatabaseConnectivityError(error)) {
      throw new Error('Database connection unavailable. Please check DATABASE_URL and try again.');
    }
    throw error;
  }
}

// 1. Orientation Days
export async function createOrientationDay(data: {
  title: string;
  slug: string;
  eventDate: Date;
  description?: string;
  venue?: string;
  status?: string;
  displayOrder?: number;
}) {
  await runAdminMutation('create orientation day', async () => {
    await (prisma as any).orientationDay.create({
      data: {
        title: data.title,
        slug: data.slug,
        eventDate: data.eventDate,
        description: data.description || null,
        venue: data.venue || null,
        status: data.status || 'published',
        displayOrder: data.displayOrder || 0,
      },
    });
  });
  revalidatePath('/admin');
  revalidatePath('/admin/orientation');
  revalidatePath('/orientation');
  revalidatePath('/orientation/schedule');
}

export async function updateOrientationDay(
  id: string,
  data: {
    title: string;
    slug: string;
    eventDate: Date;
    description?: string;
    venue?: string;
    status: string;
    displayOrder: number;
  }
) {
  await runAdminMutation('update orientation day', async () => {
    await (prisma as any).orientationDay.update({
      where: { id },
      data,
    });
  });
  revalidatePath('/admin');
  revalidatePath('/admin/orientation');
  revalidatePath('/orientation');
  revalidatePath('/orientation/schedule');
  revalidatePath(`/orientation/day/${data.slug}`);
}

export async function deleteOrientationDay(id: string) {
  await runAdminMutation('delete orientation day', async () => {
    await (prisma as any).orientationDay.delete({ where: { id } });
  });
  revalidatePath('/admin');
  revalidatePath('/admin/orientation');
  revalidatePath('/orientation');
  revalidatePath('/orientation/schedule');
}

// 2. Orientation Activities
export async function createOrientationActivity(data: {
  orientationDayId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime?: string;
  venue: string;
  category: string;
  speaker?: string;
  isCompulsory: boolean;
  displayOrder?: number;
}) {
  await runAdminMutation('create orientation activity', async () => {
    await (prisma as any).orientationActivity.create({
      data: {
        orientationDayId: data.orientationDayId,
        title: data.title,
        description: data.description || null,
        startTime: data.startTime,
        endTime: data.endTime || null,
        venue: data.venue,
        category: data.category,
        speaker: data.speaker || null,
        isCompulsory: data.isCompulsory,
        displayOrder: data.displayOrder || 0,
        status: 'published',
      },
    });
  });
  revalidatePath('/admin');
  revalidatePath('/admin/schedule');
  revalidatePath('/orientation');
  revalidatePath('/orientation/schedule');
}

export async function deleteOrientationActivity(id: string) {
  await runAdminMutation('delete orientation activity', async () => {
    await (prisma as any).orientationActivity.delete({ where: { id } });
  });
  revalidatePath('/admin');
  revalidatePath('/admin/schedule');
  revalidatePath('/orientation');
  revalidatePath('/orientation/schedule');
}

// 3. Announcements
export async function createAnnouncement(data: {
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  priority: string;
  status: string;
}) {
  await runAdminMutation('create announcement', async () => {
    await (prisma as any).announcement.create({
      data: {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        content: data.content,
        category: data.category,
        priority: data.priority,
        status: data.status,
      },
    });
  });
  revalidatePath('/admin');
  revalidatePath('/admin/announcements');
  revalidatePath('/announcements');
  revalidatePath('/');
}

export async function updateAnnouncement(
  id: string,
  data: {
    title: string;
    slug: string;
    summary: string;
    content: string;
    category: string;
    priority: string;
    status: string;
  }
) {
  await runAdminMutation('update announcement', async () => {
    await (prisma as any).announcement.update({
      where: { id },
      data,
    });
  });
  revalidatePath('/admin');
  revalidatePath('/admin/announcements');
  revalidatePath('/announcements');
  revalidatePath(`/announcements/${data.slug}`);
  revalidatePath('/');
}

export async function deleteAnnouncement(id: string) {
  await runAdminMutation('delete announcement', async () => {
    await (prisma as any).announcement.delete({ where: { id } });
  });
  revalidatePath('/admin');
  revalidatePath('/admin/announcements');
  revalidatePath('/announcements');
  revalidatePath('/');
}

// 4. FAQs
export async function createFaq(data: {
  question: string;
  answer: string;
  category: string;
  displayOrder?: number;
}) {
  await runAdminMutation('create faq', async () => {
    await (prisma as any).faq.create({
      data: {
        question: data.question,
        answer: data.answer,
        category: data.category,
        displayOrder: data.displayOrder || 0,
        status: 'published',
      },
    });
  });
  revalidatePath('/admin');
  revalidatePath('/admin/faqs');
  revalidatePath('/faq');
}

export async function deleteFaq(id: string) {
  await runAdminMutation('delete faq', async () => {
    await (prisma as any).faq.delete({ where: { id } });
  });
  revalidatePath('/admin');
  revalidatePath('/admin/faqs');
  revalidatePath('/faq');
}

// 5. Leadership Profiles
export async function updateLeadershipProfile(
  id: string,
  data: {
    name: string;
    role: string;
    biography: string;
    contactUrl?: string;
  }
) {
  await runAdminMutation('update leadership profile', async () => {
    await (prisma as any).leadershipProfile.upsert({
      where: { id },
      update: data,
      create: {
        id,
        name: data.name,
        role: data.role,
        biography: data.biography,
        contactUrl: data.contactUrl || null,
        status: 'published',
      },
    });
  });
  revalidatePath('/admin');
  revalidatePath('/admin/leadership');
  revalidatePath('/leadership');
  revalidatePath('/about');
}

// 6. Transport Guides
export async function createTransportGuide(data: {
  originCity: string;
  destination: string;
  providerName: string;
  terminalName: string;
  routeDescription: string;
  estimatedFare?: string;
  estimatedDuration?: string;
}) {
  await runAdminMutation('create transport guide', async () => {
    await (prisma as any).transportGuide.create({
      data: {
        originCity: data.originCity,
        destination: data.destination,
        providerName: data.providerName,
        terminalName: data.terminalName,
        routeDescription: data.routeDescription,
        estimatedFare: data.estimatedFare || null,
        estimatedDuration: data.estimatedDuration || null,
        lastVerifiedAt: new Date(),
        status: 'published',
      },
    });
  });
  revalidatePath('/admin');
  revalidatePath('/admin/transport');
  revalidatePath('/travel/transport');
}

export async function deleteTransportGuide(id: string) {
  await runAdminMutation('delete transport guide', async () => {
    await (prisma as any).transportGuide.delete({ where: { id } });
  });
  revalidatePath('/admin');
  revalidatePath('/admin/transport');
  revalidatePath('/travel/transport');
}

// 7. Site Settings
export async function updateSiteSettings(settings: Record<string, string>) {
  await runAdminMutation('update site settings', async () => {
    for (const [key, value] of Object.entries(settings)) {
      await (prisma as any).siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
  });
  revalidatePath('/admin');
  revalidatePath('/admin/settings');
  revalidatePath('/');
  revalidatePath('/travel');
  revalidatePath('/contact');
}

// 8. Contact Message Status
export async function markContactMessageStatus(id: string, status: string) {
  await runAdminMutation('mark contact message status', async () => {
    await (prisma as any).contactMessage.update({
      where: { id },
      data: { status },
    });
  });
  revalidatePath('/admin');
  revalidatePath('/admin/messages');
}

// Legacy Founder's Week Actions for Backwards Compatibility
export async function createEventDay(data: { title: string; date: Date; description?: string }) {
  await runAdminMutation('create legacy event day', async () => {
    await (prisma as any).eventDay.create({ data });
  });
  revalidatePath('/admin/events');
}

export async function updateEventDay(id: string, data: { title: string; date: Date; description?: string }) {
  await runAdminMutation('update legacy event day', async () => {
    await (prisma as any).eventDay.update({ where: { id }, data });
  });
  revalidatePath('/admin/events');
}

export async function deleteEventDay(id: string) {
  await runAdminMutation('delete legacy event day', async () => {
    await (prisma as any).eventDay.delete({ where: { id } });
  });
  revalidatePath('/admin/events');
}

export async function createCategory(data: { name: string; description?: string; pricePerVote?: number; isOpen?: boolean }) {
  await runAdminMutation('create category', async () => {
    await (prisma as any).votingCategory.create({ data });
  });
  revalidatePath('/admin/categories');
}

export async function updateCategory(id: string, data: { name: string; description?: string; pricePerVote?: number; isOpen?: boolean }) {
  await runAdminMutation('update category', async () => {
    await (prisma as any).votingCategory.update({ where: { id }, data });
  });
  revalidatePath('/admin/categories');
}

export async function deleteCategory(id: string) {
  await runAdminMutation('delete category', async () => {
    await (prisma as any).votingCategory.delete({ where: { id } });
  });
  revalidatePath('/admin/categories');
}

export async function createCandidate(data: { name: string; categoryId: string; department?: string; level?: string; imageUrl?: string }) {
  await runAdminMutation('create candidate', async () => {
    await (prisma as any).candidate.create({ data });
  });
  revalidatePath('/admin/candidates');
}

export async function updateCandidate(id: string, data: { name: string; categoryId: string; department?: string; level?: string; imageUrl?: string }) {
  await runAdminMutation('update candidate', async () => {
    await (prisma as any).candidate.update({ where: { id }, data });
  });
  revalidatePath('/admin/candidates');
}

export async function deleteCandidate(id: string) {
  await runAdminMutation('delete candidate', async () => {
    await (prisma as any).candidate.delete({ where: { id } });
  });
  revalidatePath('/admin/candidates');
}

export async function updateVoteTransaction(
  id: string,
  data: { email: string; amount: number; voteQuantity: number; status: string; candidateId: string }
) {
  await runAdminMutation('update vote transaction', async () => {
    await (prisma as any).$transaction(async (tx: any) => {
      const existing = await tx.voteTransaction.findUnique({ where: { id } });
      if (!existing) throw new Error('Transaction not found.');
      await tx.voteTransaction.update({ where: { id }, data });
    });
  });
  revalidatePath('/admin/payments');
}
