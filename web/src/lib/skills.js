import { createSlice } from '@reduxjs/toolkit'

export const skillsSlice = createSlice({
  name: 'skills',
  initialState: [],
  reducers: {
    setClientSkills(state, action) {
      return action.payload.skills
    },
  },
})

export const { setClientSkills } = skillsSlice.actions
