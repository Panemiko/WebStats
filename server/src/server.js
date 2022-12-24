import { PrismaClient } from '@prisma/client'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const SERVER_PORT = 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

const database = new PrismaClient()

io.on('connection', (socket) => {
  console.log(`> New connection [${socket.id}]`)

  socket.on('setup', async ({ characterId }) => {
    console.log(`> Character ${characterId} loading`)

    socket.emit(
      'set-char',
      await database.character.findUnique({
        where: { id: parseInt(characterId) },
      })
    )
  })
})

server.listen(SERVER_PORT, () => {
  console.log(`> Server started on port ${SERVER_PORT}`)
})
