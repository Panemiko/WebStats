import { useGetLinkId } from 'hooks/useGetLinkId'
import { setCharacter } from 'lib/character'
import { setMeta } from 'lib/meta'
import { getSocket } from 'lib/socket'
import { store } from 'lib/store'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useSetup() {
  const { getIdFromLink } = useGetLinkId()

  // Get state from previous page
  const { state: previousPageState } = useLocation()

  // Get state from current page
  const { character } = store.getState()

  // Get character id from url
  const characterId = getIdFromLink('characterId')

  // Get socket connection
  const socket = getSocket()

  // Define socket events
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected')
    })

    socket.on('disconnect', () => {
      console.log('Disconnected')
    })

    socket.on('connect_error', (err) => {
      console.error(err)
    })

    socket.on('setCharacter', ({ character }) => {
      console.log(`Setting character (${character.name})`)

      store.dispatch(setCharacter({ character }))
    })

    socket.on('setMeta', ({ meta }) => {
      console.log('Setting meta')

      store.dispatch(setMeta({ meta }))
    })
  }, [])

  // Set the previous page data if no other was found
  if (previousPageState && !character.id) {
    store.dispatch(setCharacter({ character: previousPageState.character }))
    store.dispatch(setMeta({ meta: previousPageState.meta }))
    return
  }

  // Request the data if the current data is not set or the id is outdated
  if (!character.id || character.id !== characterId) {
    console.log(`Logging in using character id ${characterId}`)

    socket.on('connect', () => {
      console.log('Sending a setup request')
      socket.emit('setup', { characterId })
    })
  }
}
