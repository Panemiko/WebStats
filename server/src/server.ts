import { config as dotenv } from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import type { AddressInfo } from 'net'

import { createSocketServer } from './socket'

dotenv()

// Server port
const PORT = process.env.PORT || 3000

// Create server
const app = express()
const server = createServer(app)

// Setup socket server
createSocketServer(server)

server.listen(PORT, () => {
  const { port: serverPort } = server.address() as AddressInfo

  console.log(`> Server started at port ${serverPort}`)
})
