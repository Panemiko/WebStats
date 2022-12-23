import { PrismaClient } from '@prisma/client'

export const database = global.database || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.database = database
