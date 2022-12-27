import { createSlice } from '@reduxjs/toolkit'

export const attributesSlice = createSlice({
  name: 'attributes',
  initialState: [],
  reducers: {
    setClientAttributes(state, action) {
      return action.payload.attributes
    },
  },
})

export const { setClientAttributes } = attributesSlice.actions
