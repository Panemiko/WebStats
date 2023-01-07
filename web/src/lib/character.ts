import type { Item } from '@prisma/client'
import { createSlice } from '@reduxjs/toolkit'
import { getSocket } from 'lib/socket'
import type { Character } from 'types/Character'

import type { Ability } from '.prisma/client'

interface Action<T> {
  payload: T
}

export const characterSlice = createSlice({
  name: 'character',
  initialState: {} as Character,
  reducers: {
    /**
     * Does not update the server
     */
    setCharacter(state, action: Action<{ character: Character }>) {
      return action.payload.character
    },
    updateCharacterLevel(state, action: Action<{ level: number }>) {
      const socket = getSocket()
      socket.emit('updateCharacterLevel', action.payload)
    },
    updateCharacterLife(state, action: Action<{ life: number }>) {
      const socket = getSocket()
      socket.emit('updateCharacterLife', action.payload)
    },
    updateCharacterMaxLife(state, action: Action<{ maxLife: number }>) {
      const socket = getSocket()
      socket.emit('updateCharacterMaxLife', action.payload)
    },
    updateCharacterSanity(state, action: Action<{ sanity: number }>) {
      const socket = getSocket()
      socket.emit('updateCharacterSanity', action.payload)
    },
    updateCharacterMaxSanity(state, action: Action<{ maxSanity: number }>) {
      const socket = getSocket()
      socket.emit('updateCharacterMaxSanity', action.payload)
    },
    updateCharacterAttributeLevel(
      state,
      action: Action<{ attributeId: number; level: number }>
    ) {
      const socket = getSocket()
      socket.emit('updateCharacterAttributeLevel', action.payload)
    },
    updateCharacterSkillLevel(
      state,
      action: Action<{ skillId: number; level: number }>
    ) {
      const socket = getSocket()
      socket.emit('updateCharacterSkillLevel', action.payload)
    },
    addCharacterItem(
      state,
      action: Action<{ name: string; weight: number; quantity: number }>
    ) {
      const socket = getSocket()
      socket.emit('addCharacterItem', action.payload)
    },
    updateCharacterItem(state, action: Action<Partial<Item>>) {
      const socket = getSocket()
      socket.emit('updateCharacterItem', action.payload)
    },
    addCharacterAbility(state, action: Action<{ name: string }>) {
      const socket = getSocket()
      socket.emit('updateCharacterItem', action.payload)
    },
    updateCharacterAbility(state, action: Action<Partial<Ability>>) {
      const socket = getSocket()
      socket.emit('updateCharacterItem', action.payload)
    },
    updateCharacterNotes(state, action: Action<{ notes: string }>) {
      const socket = getSocket()
      socket.emit('updateCharacterNotes', action.payload)
    },
  },
})

export const {
  setCharacter,
  addCharacterAbility,
  addCharacterItem,
  updateCharacterAbility,
  updateCharacterAttributeLevel,
  updateCharacterItem,
  updateCharacterLevel,
  updateCharacterLife,
  updateCharacterMaxLife,
  updateCharacterMaxSanity,
  updateCharacterNotes,
  updateCharacterSanity,
  updateCharacterSkillLevel,
} = characterSlice.actions
