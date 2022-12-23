import { Server } from 'socket.io'

export default function SocketRoute(req, res) {
  const io = new Server(res.socket.server)
  res.socket.server.io = io

  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`)

    socket.on('setup', ({ characterId }) => {
      socket.emit('setup-response', { characterId })
    })
  })

  res.end()
}
