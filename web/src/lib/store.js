import { configureStore } from '@reduxjs/toolkit'
import { attributesSlice } from 'lib/attributes'
import { characterSlice } from 'lib/character'
import { skillsSlice } from 'lib/skills'

export const store = configureStore({
  reducer: {
    character: characterSlice.reducer,
    attributes: attributesSlice.reducer,
    skills: skillsSlice.reducer,
  },
})
