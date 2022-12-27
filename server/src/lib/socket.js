import { Server } from 'socket.io'

import { characterIdInvalid } from './checkInvalidCharacterId.js'
import { ClientInteractions } from './interactions.js'
import { updateCharacter } from './repositories.js'

export function setupSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    socket.on('setup', async ({ characterId }) => {
      // Check for invalid character ids
      if (await characterIdInvalid(characterId)) {
        socket.disconnect()
        console.log(
          `> Socket disconnected due to the use of an invalid character id (${characterId})`
        )
        return
      }

      console.log(`> Character ${characterId} loading`)

      const interactions = new ClientInteractions(socket, characterId)

      await interactions.joinCharacterRoom()
      await interactions.setCharacter()
      await interactions.setAttributes()
      await interactions.setSkills()

      socket.on('update-character', async ({ characterId, data }) => {
        console.log(`> Updating character ${characterId}`)

        // Update character with new data
        updateCharacter(characterId, data)

        // Update character for all clients with the character
        await ClientInteractions.byCharacterRoom(io, characterId).setCharacter()
      })
    })

    socket.on('disconnect', () => {
      console.log('> Socket disconnected')
    })
  })
}
