import { createSlice } from '@reduxjs/toolkit'

export const attributesSlice = createSlice({
  name: 'attributes',
  initialState: [],
  reducers: {
    setAttributes(state, action) {
      return action.payload.attributes
    },
  },
})

export const { setAttributes } = attributesSlice.actions
