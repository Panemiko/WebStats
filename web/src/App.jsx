import { layoutContext } from 'contexts/LayoutContext'
import { metaContext } from 'contexts/MetaContext'
import { AttributeLayout } from 'layouts/Attribute'
import { CharacterInfoLayout } from 'layouts/CharacterInfo'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function CharacterPage() {
  const [layout, setLayout] = useState('character')
  const [socket, setSocket] = useState({})
  const [character, setCharacter] = useState({})
  const [attributes, setAttributes] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    const socket = io('ws://localhost:3000')

    setSocket(socket)

    const characterId = parseInt(
      window.location.pathname.replace('/character/', '')
    )

    socket.on('connect', () => {
      console.log('Connected')
      socket.emit('setup', { characterId })
    })

    socket.on('disconnect', () => {
      console.log('Disconnected')
    })

    socket.on('connect_error', (err) => {
      console.error(err)
    })

    socket.on('set-character', (character) => {
      console.log(`Setting character to ${character.name}`)

      setCharacter(character || { name: 'Personagem não encontrado' })
    })

    socket.on('set-attributes', (attributes) => {
      console.log('Setting attributes')

      setAttributes(attributes || [])
    })

    socket.on('set-skills', (skills) => {
      console.log('Setting skills')

      setSkills(skills || [])
    })
  }, [])

  return (
    <metaContext.Provider value={{ character, attributes, skills, socket }}>
      <layoutContext.Provider value={{ layout, setLayout }}>
        {layout === 'character' && <CharacterInfoLayout />}
        {layout.startsWith('attribute') && <AttributeLayout />}
      </layoutContext.Provider>
    </metaContext.Provider>
  )
}
