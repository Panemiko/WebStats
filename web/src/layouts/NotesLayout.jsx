import { ActionButton } from 'components/List/ActionButton'
import { Header } from 'components/List/Header'
import { Title } from 'components/List/Title'
import { useStoreUpdate } from 'hooks/useStoreUpdate'
import { setNotes as setCharacterNotes } from 'lib/character'
import { store } from 'lib/store'
import { useEffect, useState } from 'react'

export function NotesLayout() {
  const { character } = useStoreUpdate()
  const [notes, setNotes] = useState()

  useEffect(() => {
    if (character.notes === notes) return
    setNotes(character.notes)
  }, [character])

  function saveNotes() {
    store.dispatch(setCharacterNotes({ notes }))
  }

  return (
    <div>
      <Header>
        <Title>Anotações</Title>
      </Header>
      <input
        className='mx-5 h-[stretch] bg-violet3 hover:bg-violet4 focus:bg-violet5 rounded-xl w-[stretch] text-lg px-3 py-5 text-violet12 mb-6 outline-none '
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value)
        }}
      />
      <ActionButton onClick={saveNotes}>SALVAR</ActionButton>
    </div>
  )
}
