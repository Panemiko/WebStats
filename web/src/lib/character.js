import { createSlice } from '@reduxjs/toolkit'

export const characterSlice = createSlice({
  name: 'character',
  initialState: {},
  reducers: {
    setCharacter(state, action) {
      return action.payload.character
    },
  },
})

export const { setCharacter } = characterSlice.actions
