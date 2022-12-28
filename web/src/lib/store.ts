import { configureStore } from '@reduxjs/toolkit'
import { characterSlice } from 'lib/character'
import { metaSlice } from 'lib/meta'

export const store = configureStore({
  reducer: {
    character: characterSlice.reducer,
    meta: metaSlice.reducer,
  },
})
