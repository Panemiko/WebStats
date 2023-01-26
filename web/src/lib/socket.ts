import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

const SOCKET_ADDRESS = import.meta.env.VITE_SOCKET_ADDRESS

declare global {
  interface Window {
    socket: Socket | undefined
  }
}

export const socket = window.socket || io(SOCKET_ADDRESS)
window.socket = socket
