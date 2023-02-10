import { PrismaClient } from '@prisma/client'

import { Realtime } from '@/api/Realtime'

/**
 * Creates the prisma client with the needed settings (realtime middleware)
 */
function createPrismaClient() {
  const database = new PrismaClient()

  database.$use(Realtime.getInstance().databaseMiddleware)

  return { database }
}

export const { database } = global || createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.database = database
}
