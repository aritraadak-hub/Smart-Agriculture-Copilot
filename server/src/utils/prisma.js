import { PrismaClient } from '@prisma/client';

let prisma;

try {
  prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
} catch (e) {
  console.warn('⚠️ PrismaClient initialization failed (standalone mode active):', e.message);
  prisma = null;
}

export { prisma };
