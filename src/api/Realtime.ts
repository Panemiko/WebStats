import type { Prisma } from '@prisma/client'

export type RealtimeListenerParams = { table: Prisma.ModelName }
export type RealtimeListener = (params: RealtimeListenerParams) => any

export class Realtime {
  private static instance: Realtime
  private listeners: RealtimeListener[] = []
  /**
   * Only triggers the listeners with these actions
   */
  private listeningActions: Prisma.PrismaAction[] = [
    'create',
    'createMany',
    'aggregate',
    'delete',
    'deleteMany',
    'update',
    'updateMany',
    'upsert',
  ]

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Realtime()
    }

    return this.instance
  }

  /**
   * Runs the callback when the database has changed
   */
  async subscribe(listener: RealtimeListener) {
    this.listeners.push(listener)
  }

  /**
   * Sends the event to all the listeners
   */
  async dispatch(params: RealtimeListenerParams) {
    this.listeners.forEach((listener) => {
      listener(params)
    })
  }

  /**
   * Should be used with the `PrismaClient.$use` as a middleware
   */
  databaseMiddleware: Prisma.Middleware<any> = async (params, next) => {
    let validAction = false

    // Validates if the action is valid
    for (const listeningAction of this.listeningActions) {
      if (params.action === listeningAction) validAction = true
    }

    if (validAction && params.model) {
      this.dispatch({ table: params.model })
    }

    return next(params)
  }
}
