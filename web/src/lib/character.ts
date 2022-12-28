import { createSlice } from '@reduxjs/toolkit'
import type { Character } from 'types/Character'

interface SetCharacterAction {
  payload: {
    character: Character
  }
}

export const characterSlice = createSlice({
  name: 'character',
  initialState: {} as Character,
  reducers: {
    /**
     * Does not update the server
     */
    setCharacter(state, action: SetCharacterAction) {
      return action.payload.character
    },
  },
})

export const { setCharacter } = characterSlice.actions
