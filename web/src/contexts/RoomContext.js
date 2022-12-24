import { createContext } from 'react'

export const roomContext = createContext({
  room: { layout: '', selector: 0 },
  setRoom: null,
})
