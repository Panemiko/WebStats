import { createSlice } from '@reduxjs/toolkit'

export const characterSlice = createSlice({
  name: 'character',
  initialState: {},
  reducers: {
    setClientCharacter(state, action) {
      return action.payload.character
    },
  },
})

export const { setClientCharacter } = characterSlice.actions
