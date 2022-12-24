// import { AttributeButton } from 'components/AttributeButton'
import { CharacterAvatar } from 'components/CharacterAvatar'
import { CharacterInfo } from 'components/CharacterInfo'
import { IconButton } from 'components/IconButton'
import { LevelIndicator } from 'components/LevelIndicator'
import { LifeIndicator } from 'components/LifeIndicator'
import { SanityIndicator } from 'components/SanityIndicator'
import { characterContext } from 'contexts/CharacterContext'
import { useSocket } from 'hooks/useSocket'
import { useEffect, useState } from 'react'
import {
  MdBackpack as BackpackIcon,
  MdNotes as NoteIcon,
  MdStars as StarIcon,
} from 'react-icons/md'
import { io } from 'socket.io-client'

export default function CharacterPage() {
  const [character, setCharacter] = useState({})

  const id = '1'

  useEffect(() => {
    const socket = io('ws://localhost:3000')

    socket.on('connect', () => {
      console.log('Connected')
      socket.emit('setup', { characterId: parseInt(id) })
    })

    socket.on('disconnect', () => {
      console.log('Disconnected')
    })

    socket.on('connect_error', (err) => {
      console.log(err)
    })

    socket.on('set-char', (char) => {
      console.log(char)

      if (!char) return setCharacter({ name: 'Personagem não encontrado' })

      setCharacter(char)
    })
  }, [])

  return (
    <characterContext.Provider value={id}>
      <div className='h-screen w-screen bg-slate2'>
        <main className='py-12 px-4 bg-mauve1 grid grid-cols-5 '>
          <div className='col-start-1 col-end-4'>
            <div className='flex flex-col mb-6'>
              <LevelIndicator level={character.level} />
              <CharacterInfo name={character.name} age={character.age} />
            </div>
            <div className='flex flex-col gap-2'>
              <LifeIndicator
                life={character.life}
                maxLife={character.maxLife}
              />
              <SanityIndicator
                sanity={character.sanity}
                maxSanity={character.maxSanity}
              />
            </div>
          </div>
          <div className='col-start-4 col-end-6'>
            <CharacterAvatar src={character.picture} />
          </div>
        </main>
        <div className='flex bg-mauve1 justify-between px-4 pb-12'>
          <IconButton Icon={BackpackIcon} />
          <IconButton Icon={StarIcon} />
          <IconButton Icon={NoteIcon} />
        </div>
        {/* <div className='py-8 px-4'>
          <h1 className='text-cyan12 mb-8 font-bold text-2xl text-center'>
            ATRIBUTOS
          </h1>
          <div className='flex justify-between mb-10'>
            <AttributeButton level={1} tag='crp' />
            <AttributeButton level={1} tag='rfx' />
            <AttributeButton level={1} tag='tec' />
          </div>
          <div className='flex justify-between'>
            <AttributeButton level={1} tag='int' />
            <AttributeButton level={0} tag='gue' />
            <AttributeButton level={0} tag='mor' />
          </div>
        </div> */}
      </div>
    </characterContext.Provider>
  )
}
