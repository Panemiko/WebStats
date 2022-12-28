import type { Ability, Attribute, Character, Item, Skill } from '@prisma/client'
import type { Server as HTTPServer } from 'http'
import { Interaction } from 'Interaction'
import { Server } from 'socket.io'

export interface ServerToClientEvents {
  setCharacter(params: { character: Character }): any
  setMeta(params: { meta: { attributes: Attribute[]; skills: Skill[] } }): any
}

export interface ClientToServerEvents {
  setup(params: { characterId: number }): any
  updateCharacterNotes(params: { notes: string }): any
  updateCharacterLevel(params: { level: number }): any
  updateCharacterLife(params: { life: number }): any
  updateCharacterMaxlife(params: { maxLife: number }): any
  updateCharacterSanity(params: { sanity: number }): any
  updateCharacterMaxSanity(params: { maxSanity: number }): any
  updateCharacterAttributeLevel(params: {
    attributeId: number
    level: number
  }): any
  updateCharacterSkillLevel(params: { skillId: number; level: number }): any
  addCharacterItem(params: {
    name: string
    weight: number
    quantity: number
  }): any
  updateCharacterItem(params: Partial<Item>): any
  addCharacterAbility(params: { name: string }): any
  updateCharacterAbility(params: Partial<Ability>): any
}

interface InterServerEvents {
  ping: () => any
  disconnection(): any
}

export async function createSocketServer(server: HTTPServer) {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents
  >(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', async (socket) => {
    console.log(`> Socket connected [${socket.id}]`)

    socket.on('setup', async ({ characterId }) => {
      console.log(`> Setting up character ${characterId} [${socket.id}]`)
      const interaction = new Interaction(socket, characterId)

      console.log(`> Joining Character Room ${characterId} [${socket.id}]`)
      await interaction.joinCharacterRoom()

      console.log(`> Sending data to client [${socket.id}]`)
      await interaction.setCharacter()
      await interaction.setMeta()

      async function updateCharacter(updateFunction: (...params: any) => any) {
        console.log(`> Updating character ${characterId} [${socket.id}]`)
        updateFunction()
        console.log(`> Setting character to other clients [${socket.id}]`)
        await interaction.setClientRoomCharacter(io)
      }

      socket.on('updateCharacterNotes', ({ notes }) => {
        updateCharacter(() => {
          interaction.updateCharacterNotes(notes)
        })
      })

      socket.on('updateCharacterLevel', ({ level }) => {
        updateCharacter(() => {
          interaction.updateCharacterLevel(level)
        })
      })

      socket.on('updateCharacterLife', ({ life }) => {
        updateCharacter(() => {
          interaction.updateCharacterLife(life)
        })
      })

      socket.on(
        'updateCharacterMaxlife',
        ({ maxLife }: { maxLife: number }) => {
          updateCharacter(() => {
            interaction.updateCharacterMaxLife(maxLife)
          })
        }
      )

      socket.on('updateCharacterSanity', ({ sanity }) => {
        updateCharacter(() => {
          interaction.updateCharacterSanity(sanity)
        })
      })

      socket.on(
        'updateCharacterMaxSanity',
        ({ maxSanity }: { maxSanity: number }) => {
          updateCharacter(() => {
            interaction.updateCharacterMaxSanity(maxSanity)
          })
        }
      )

      socket.on('updateCharacterAttributeLevel', ({ attributeId, level }) => {
        updateCharacter(() => {
          interaction.updateCharacterAttributeLevel(attributeId, level)
        })
      })

      socket.on('updateCharacterSkillLevel', ({ skillId, level }) => {
        updateCharacter(() => {
          interaction.updateCharacterSkillLevel(skillId, level)
        })
      })

      socket.on(
        'addCharacterItem',
        ({
          name,
          weight,
          quantity,
        }: {
          name: string
          weight: number
          quantity: number
        }) => {
          updateCharacter(() => {
            interaction.addCharacterItem(name, weight, quantity)
          })
        }
      )

      socket.on('updateCharacterItem', (data) => {
        updateCharacter(() => {
          interaction.updateCharacterItem(data)
        })
      })

      socket.on('addCharacterAbility', ({ name }) => {
        updateCharacter(() => {
          interaction.addCharacterAbility(name)
        })
      })

      socket.on('updateCharacterAbility', (data) => {
        updateCharacter(() => {
          interaction.updateCharacterAbility(data)
        })
      })
    })

    io.on('disconnection', () => {
      console.log(`> Socket disconnected [${socket.id}]`)
    })
  })
}
