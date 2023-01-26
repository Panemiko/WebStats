import { ActionButton } from 'components/ActionButton'
import { ButtonContainer } from 'components/List/ButtonContainer'
import { Header } from 'components/List/Header'
import { Title } from 'components/List/Title'
import { useSetup } from 'hooks/useSetup'
import { useStoreUpdate } from 'hooks/useStoreUpdate'
import { socket } from 'lib/socket'
import { useEffect, useState } from 'react'

export function NotesPage() {
  useSetup()

  const { character } = useStoreUpdate()
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (character.notes === notes) return
    setNotes(character.notes)
  }, [character])

  function saveNotes() {
    console.log('Updating character notes')
    socket.emit('updateCharacterNotes', { notes })
  }

  return (
    <div>
      <Header>
        <Title>Anotações</Title>
      </Header>
      <div className='px-5'>
        <textarea
          className='h-screen bg-violet3 hover:bg-violet4 focus:bg-violet5 rounded-xl px-3 w-[stretch] text-lg py-5 text-violet12 mb-6 outline-none'
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value)
          }}
        />
      </div>
      <ButtonContainer>
        <ActionButton onClick={saveNotes}>SALVAR</ActionButton>
      </ButtonContainer>
    </div>
  )
}
