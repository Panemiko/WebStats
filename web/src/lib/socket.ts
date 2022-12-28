import { io } from 'socket.io-client'

const SOCKET_ADDRESS = import.meta.env.VITE_SOCKET_ADDRESS

const socket = io(SOCKET_ADDRESS)

export function getSocket() {
  return socket
}
