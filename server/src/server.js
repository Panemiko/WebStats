import { config as dotenv } from 'dotenv'
import express from 'express'
import { createServer } from 'http'

import { setupSocketServer } from './lib/socket.js'

dotenv()

// eslint-disable-next-line no-undef
const SERVER_PORT = process.env.PORT || 3000

// Create server
const app = express()
const server = createServer(app)

// Setup socket server and events
setupSocketServer(server)

server.listen(SERVER_PORT, () => {
  console.log(`> Server started on port ${SERVER_PORT}`)
})
