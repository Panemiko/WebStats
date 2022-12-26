import { createSlice } from '@reduxjs/toolkit'

export const skillsSlice = createSlice({
  name: 'skills',
  initialState: [],
  reducers: {
    setSkills(state, action) {
      return action.payload.skills
    },
  },
})

export const { setSkills } = skillsSlice.actions
