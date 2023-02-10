import chalk from 'chalk'

export class Log {
  socketId?: string

  constructor(params: { socketId: string }) {
    this.socketId = params.socketId
  }

  static info(...log: string[]) {
    console.info('>', chalk.bold.green(...log))
  }

  static error(...log: string[]) {
    console.error('>', chalk.bold.red(...log))
  }

  info(log: string) {
    if (this.socketId) {
      Log.info(log, this.socketId && `[${this.socketId}]`)
    }

    Log.info(log)
  }

  error(log: string) {
    if (this.socketId) {
      Log.error(log, this.socketId && `[${this.socketId}]`)
    }

    Log.error(log)
  }
}
