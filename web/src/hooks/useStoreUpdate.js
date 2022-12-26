import { store } from 'lib/store'
import { useState } from 'react'

export function useStoreUpdate() {
  const [state, setState] = useState(store.getState())

  store.subscribe(() => {
    setState(store.getState())
  })

  return state
}
