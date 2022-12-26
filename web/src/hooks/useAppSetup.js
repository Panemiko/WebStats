import { setAttributes } from 'lib/attributes'
import { setCharacter } from 'lib/character'
import { setSkills } from 'lib/skills'
import { store } from 'lib/store'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'

import { useGetIdFromParam } from './useGetIdFromParam'

const WEBSOCKET_ADDRESS = 'ws://localhost:3000'

export function useAppSetup() {
  const { getIdFromParam } = useGetIdFromParam()

  const { state: previousPageState } = useLocation()

  const { character } = store.getState()

  const characterId = getIdFromParam('characterId')

  const socket = io(WEBSOCKET_ADDRESS)

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

      store.dispatch(setCharacter({ character }))
    })

    socket.on('set-attributes', (attributes) => {
      console.log('Setting attributes')

      store.dispatch(setAttributes({ attributes }))
    })

    socket.on('set-skills', (skills) => {
      console.log('Setting skills')

      store.dispatch(setSkills({ skills }))
    })
  }, [])

  // Set the previous page data if no other was found
  if (previousPageState && !character.id) {
    store.dispatch(setCharacter({ character: previousPageState.character }))
    store.dispatch(setAttributes({ attributes: previousPageState.attributes }))
    store.dispatch(setSkills({ skills: previousPageState.skills }))

    console.log(store.getState())

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
