import type { Server as NetServer } from 'http'
import type { NextApiRequest } from 'next'
import { Server as ServerIO } from 'socket.io'

import { Log } from '@/api/Log'
import { Realtime } from '@/api/Realtime'
import type { NextApiResponseServerIO } from '@/types/SocketResponse'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function SocketRoute(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    Log.info('Socket.io server created')

    // Adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: '/api/socket',
    })

    io.on('connection', (socket) => {
      const log = new Log({ socketId: socket.id })

      log.info('Socket connected')

      // Setup the realtime module
      Realtime.getInstance().subscribe((params) => {
        socket.emit('database-update', params)
      })
    })

    // Append SocketIO server to Next.js socket server response
    res.socket.server.io = io
  }

  res.end()
}
