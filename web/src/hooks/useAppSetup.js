import { useGetIdFromParam } from 'hooks/useGetIdFromParam'
import { setClientAttributes } from 'lib/attributes'
import { setClientCharacter } from 'lib/character'
import { setClientSkills } from 'lib/skills'
import { getSocket } from 'lib/socket'
import { store } from 'lib/store'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useAppSetup() {
  const { getIdFromParam } = useGetIdFromParam()

  // Get state from previous page
  const { state: previousPageState } = useLocation()

  // Get state from current page
  const { character } = store.getState()

  // Get character id from url
  const characterId = getIdFromParam('characterId')

  const socket = getSocket()

  // Default socket events
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

    socket.on('set-character', (character) => {
      console.log(`Setting character to ${character.name}`)

      store.dispatch(setClientCharacter({ character }))
    })

    socket.on('set-attributes', (attributes) => {
      console.log('Setting attributes')

      store.dispatch(setClientAttributes({ attributes }))
    })

    socket.on('set-skills', (skills) => {
      console.log('Setting skills')

      store.dispatch(setClientSkills({ skills }))
    })
  }, [])

  // Set the previous page data if no other was found
  if (previousPageState && !character.id) {
    store.dispatch(
      setClientCharacter({ character: previousPageState.character })
    )
    store.dispatch(
      setClientAttributes({ attributes: previousPageState.attributes })
    )
    store.dispatch(setClientSkills({ skills: previousPageState.skills }))

    return
  }

  // Request the data if the current data is not set or the id is outdated
  if (!character.id || character.id !== characterId) {
    console.log(`Loging in using character id ${characterId}`)

    socket.on('connect', () => {
      console.log('Sending a setup request')
      socket.emit('setup', { characterId })
    })
  }
}
