import { createSlice } from '@reduxjs/toolkit'
import type { Meta } from 'types/Meta'

interface SetMetaAction {
  payload: {
    meta: Meta
  }
}

export const metaSlice = createSlice({
  name: 'meta',
  initialState: {} as Meta,
  reducers: {
    setMeta(state, action: SetMetaAction) {
      return action.payload.meta
    },
  },
})

export const { setMeta } = metaSlice.actions
