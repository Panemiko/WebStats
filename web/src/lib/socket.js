import { io } from 'socket.io-client'

// Get websocket address from .env file
const WEBSOCKET_ADDRESS = import.meta.env.VITE_WEBSOCKET_ADDRESS

// Start the socket connection
const socket = io(WEBSOCKET_ADDRESS)

export function getSocket() {
  return socket
}
