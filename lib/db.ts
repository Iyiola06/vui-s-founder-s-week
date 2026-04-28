import { Prisma } from '@prisma/client';

export function isDatabaseConnectivityError(error: unknown) {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return ['P1000', 'P1001', 'P1002', 'P1003', 'P1010', 'P1011', 'P1017'].includes(error.code);
  }

  const message = error instanceof Error ? error.message : String(error);

  return /can't reach database|database server|connection|connect|timeout|timed out|authentication failed/i.test(message);
}

export function logDatabaseIssue(context: string, error: unknown) {
  const message = error instanceof Error ? error.message.split('\n')[0] : String(error);
  console.warn(`[database] ${context}: ${message}`);
}

export function databaseUnavailableResponse() {
  return {
    error: 'Database connection unavailable. Please check DATABASE_URL and try again.',
  };
}
