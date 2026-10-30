import { PrismaClient } from '@prisma/client';

const noOp = {
  findMany: async () => [],
  findFirst: async () => null,
  findUnique: async () => null,
  create: async (d?: any) => d?.data ?? {},
  update: async (d?: any) => d?.data ?? {},
  delete: async () => ({}),
  deleteMany: async () => ({ count: 0 }),
  count: async () => 0,
};

const createMockPrisma = () => {
  return new Proxy({} as any, {
    get: (_, prop) => {
      if (prop === '$disconnect' || prop === '$connect') {
        return async () => {};
      }
      return noOp;
    },
  });
};

const prismaClientSingleton = () => {
  try {
    return new PrismaClient();
  } catch (err) {
    console.warn('[AI Studio] Database client initialization failed — using mock proxy', err);
    return createMockPrisma();
  }
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma: PrismaClient = (globalForPrisma.prisma ?? prismaClientSingleton()) as PrismaClient;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
