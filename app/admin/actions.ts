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

// Events
export async function createEventDay(data: { title: string; date: Date; description?: string }) {
  await runAdminMutation('create event day', async () => {
    await prisma.eventDay.create({ data });
  });
  revalidatePath('/admin/events');
  revalidatePath('/');
  revalidatePath('/programme');
}

export async function deleteEventDay(id: string) {
  await runAdminMutation('delete event day', async () => {
    await prisma.eventDay.delete({ where: { id } });
  });
  revalidatePath('/admin/events');
  revalidatePath('/');
  revalidatePath('/programme');
}

// Categories
export async function createCategory(data: { name: string; description?: string; pricePerVote: number; isOpen: boolean }) {
  await runAdminMutation('create category', async () => {
    await prisma.votingCategory.create({ data });
  });
  revalidatePath('/admin/categories');
  revalidatePath('/voting');
  revalidatePath('/dinner-night');
}

export async function updateCategory(id: string, data: { name: string; description?: string; pricePerVote: number; isOpen: boolean }) {
  await runAdminMutation('update category', async () => {
    await prisma.votingCategory.update({ where: { id }, data });
  });
  revalidatePath('/admin/categories');
  revalidatePath('/voting');
  revalidatePath('/dinner-night');
}

export async function deleteCategory(id: string) {
  await runAdminMutation('delete category', async () => {
    await prisma.votingCategory.delete({ where: { id } });
  });
  revalidatePath('/admin/categories');
  revalidatePath('/voting');
  revalidatePath('/dinner-night');
}

// Candidates
export async function createCandidate(data: { name: string; department?: string; level?: string; categoryId: string }) {
  await runAdminMutation('create candidate', async () => {
    await prisma.candidate.create({ data });
  });
  revalidatePath('/admin/candidates');
  revalidatePath('/voting');
}

export async function deleteCandidate(id: string) {
  await runAdminMutation('delete candidate', async () => {
    await prisma.candidate.delete({ where: { id } });
  });
  revalidatePath('/admin/candidates');
  revalidatePath('/voting');
}

// Settings
export async function updateSiteSetting(key: string, value: string) {
  await runAdminMutation('update site setting', async () => {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  });
  revalidatePath('/');
}
