import type { Character } from '@prisma/client'
import type { Server as HTTPServer } from 'http'
import { Interaction } from 'Interaction'
import { Server } from 'socket.io'

interface SetupParams {
  characterId: number
}

interface UpdateCharacterParams {
  character: Partial<Character>
}

export async function createSocketServer(server: HTTPServer) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', async (socket) => {
    console.log(`> Socket connected [${socket.id}]`)

    socket.on('setup', async ({ characterId }: SetupParams) => {
      console.log(`> Setting up character ${characterId} [${socket.id}]`)
      const interaction = new Interaction(socket, characterId)

      console.log(`> Joining Character Room ${characterId} [${socket.id}]`)
      await interaction.joinCharacterRoom()

      console.log(`> Sending data to client [${socket.id}]`)
      await interaction.setCharacter()
      await interaction.setMeta()

      socket.on(
        'update-character',
        async ({ character }: UpdateCharacterParams) => {
          console.log(`> Updating character ${character} [${socket.id}]`)
          await interaction.updateCharacter(character)

          console.log(`> Setting character to other clients [${socket.id}]`)
          await interaction.setClientRoomCharacter(io)
        }
      )
    })

    io.on('disconnection', () => {
      console.log(`> Socket disconnected [${socket.id}]`)
    })
  })
}
