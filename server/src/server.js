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

async function getCharacter(id) {
  return await database.character.findUnique({
    where: { id: parseInt(id) },
    include: {
      abilities: true,
      attributes: true,
      items: true,
      skills: true,
    },
  })
}

io.on('connection', (socket) => {
  console.log(`> New connection [${socket.id}]`)

  socket.on('setup', async ({ characterId }) => {
    if (typeof characterId !== 'number') {
      console.log(`> Socket ${socket.id} using a invalid character id`)
      return
    }

    console.log(`> Character ${characterId} loading`)

    socket.emit('set-character', await getCharacter(characterId))
    socket.emit('set-attributes', await database.attribute.findMany())
    socket.emit('set-skills', await database.skill.findMany())
  })

  socket.on('disconnect', () => {
    console.log(`> Socket ${socket.id} disconnected`)
  })
})

server.listen(SERVER_PORT, () => {
  console.log(`> Server started on port ${SERVER_PORT}`)
})
