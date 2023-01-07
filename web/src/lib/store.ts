import { configureStore } from '@reduxjs/toolkit'
import { characterSlice } from 'lib/character'
import { dialogSlice } from 'lib/dialog'
import { metaSlice } from 'lib/meta'

export const store = configureStore({
  reducer: {
    character: characterSlice.reducer,
    meta: metaSlice.reducer,
    dialog: dialogSlice.reducer,
  },
})

export function serializeFunction(func: (...params: any) => any) {
  return func.toString()
}

export function deserializeFunction(funcString: string) {
  return new Function(`return ${funcString}`)()
}
