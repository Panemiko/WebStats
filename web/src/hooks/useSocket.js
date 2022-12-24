import { io } from 'socket.io-client'

export function useSocket() {
  const socket = io('http://localhost:3000', {
    path: '/api/socket',
    transports: ['websocket'],
  })

  socket.on('connect', () => {
    console.log('Connected')
  })

  socket.on('connect_error', (err) => {
    console.log(err)
  })

  return socket
}
