import type { Ability, Attribute, Character, Item, Skill } from '@prisma/client'
import type { Server as HTTPServer } from 'http'
import { Server } from 'socket.io'

import { Interaction } from './Interaction'

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
  updateCharacterMaxWeight(params: { maxWeight: number }): any
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
  updateCharacterItem(params: Partial<Item> & { id: number }): any
  deleteCharacterItem(params: { itemId: number }): any
  addCharacterAbility(params: { name: string; level: number }): any
  updateCharacterAbility(params: Partial<Ability> & { id: number }): any
  deleteCharacterAbility(params: { abilityId: number }): any
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
        console.log(`> Setting character to other clients [${socket.id}]`)
        await interaction.setClientRoomCharacter(io, await updateFunction())
      }

      socket.on('updateCharacterNotes', async ({ notes }) => {
        updateCharacter(async () => {
          return await interaction.updateCharacterNotes(notes)
        })
      })

      socket.on('updateCharacterLevel', async ({ level }) => {
        updateCharacter(async () => {
          return await interaction.updateCharacterLevel(level)
        })
      })

      socket.on('updateCharacterLife', ({ life }) => {
        updateCharacter(async () => {
          return await interaction.updateCharacterLife(life)
        })
      })

      socket.on('updateCharacterMaxlife', ({ maxLife }) => {
        updateCharacter(async () => {
          return await interaction.updateCharacterMaxLife(maxLife)
        })
      })

      socket.on('updateCharacterSanity', ({ sanity }) => {
        updateCharacter(async () => {
          return await interaction.updateCharacterSanity(sanity)
        })
      })

      socket.on('updateCharacterMaxSanity', ({ maxSanity }) => {
        updateCharacter(async () => {
          return await interaction.updateCharacterMaxSanity(maxSanity)
        })
      })

      socket.on('updateCharacterMaxWeight', ({ maxWeight }) => {
        updateCharacter(async () => {
          return await interaction.updateCharacterMaxWeight(maxWeight)
        })
      })

      socket.on('updateCharacterAttributeLevel', ({ attributeId, level }) => {
        updateCharacter(async () => {
          return await interaction.updateCharacterAttributeLevel(
            attributeId,
            level
          )
        })
      })

      socket.on('updateCharacterSkillLevel', ({ skillId, level }) => {
        updateCharacter(async () => {
          return await interaction.updateCharacterSkillLevel(skillId, level)
        })
      })

      socket.on('addCharacterItem', ({ name, weight, quantity }) => {
        updateCharacter(async () => {
          return await interaction.addCharacterItem(name, weight, quantity)
        })
      })

      socket.on('updateCharacterItem', (data) => {
        updateCharacter(async () => {
          return await interaction.updateCharacterItem(data)
        })
      })

      socket.on('deleteCharacterItem', (data) => {
        updateCharacter(async () => {
          return await interaction.deleteCharacterItem(data.itemId)
        })
      })

      socket.on('addCharacterAbility', ({ name, level }) => {
        updateCharacter(async () => {
          return await interaction.addCharacterAbility(name, level)
        })
      })

      socket.on('updateCharacterAbility', (data) => {
        updateCharacter(async () => {
          return await interaction.updateCharacterAbility(data)
        })
      })

      socket.on('deleteCharacterAbility', (data) => {
        updateCharacter(async () => {
          return await interaction.deleteCharacterAbility(data.abilityId)
        })
      })
    })

    io.on('disconnection', () => {
      console.log(`> Socket disconnected [${socket.id}]`)
    })
  })
}
