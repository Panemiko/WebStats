import { createContext } from 'react'

export const metaContext = createContext({
  character: {},
  attributes: [],
  skills: [],
  socket: {},
})
