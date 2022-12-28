import { createSlice } from '@reduxjs/toolkit'

import { getSocket } from './socket'

export const characterSlice = createSlice({
  name: 'character',
  initialState: {},
  reducers: {
    setClientCharacter(state, action) {
      return action.payload.character
    },
    setNotes(state, action) {
      const updatedState = { ...state, notes: action.payload.notes }

      getSocket().emit('update-character', {
        characterId: state.id,
        data: { character: { notes: action.payload.notes } },
      })

      return updatedState
    },
  },
})

export const { setClientCharacter, setNotes } = characterSlice.actions
