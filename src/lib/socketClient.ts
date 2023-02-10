import SocketIOClient from 'socket.io-client'

/**
 * Creates a socket.io client with the configuration to
 * this server and some default events
 */
export function createSocketConnection() {
  const BASE_URL = process.env.BASE_URL || process.env.VERCEL_URL

  if (!BASE_URL) throw new Error('BASE_URL undefined')

  const socket = SocketIOClient(BASE_URL, {
    path: '/api/socket',
  })

  socket.on('connect', () => {
    console.info(`Connected as socket ${socket.id}`)
  })

  return socket
}

const socket = createSocketConnection()

/**
 * Gets the default instance of the socket.io client
 */
export function getSocket() {
  return socket
}
