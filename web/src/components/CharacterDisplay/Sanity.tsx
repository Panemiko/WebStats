import { useDialog } from 'hooks/useDialog'
import { useNumberFormat } from 'hooks/useNumberFormat'
import { useStoreUpdate } from 'hooks/useStoreUpdate'
import { useCallback } from 'react'
import { MdEmojiEmotions as SanityIcon } from 'react-icons/md'

export function Sanity() {
  const { character } = useStoreUpdate()
  const { toTwoDigits } = useNumberFormat()

  const formattedSanity = toTwoDigits(character.sanity || 0)
  const formattedMaxSanity = toTwoDigits(character.maxSanity || 0)

  const {
    addFormInput,
    resetDialog,
    setDialogTitle,
    toggleDialog,
    setFormSubmitAction,
    setFormSubmitFunction,
  } = useDialog()

  const editSanity = useCallback(() => {
    resetDialog()

    setDialogTitle('Editar Sanidade')
    addFormInput({
      id: 'sanity',
      name: 'sanity',
      placeholder: 'Sanidade',
      type: 'number',
      label: 'Sanidade',
      defaultValue: character.sanity.toString(),
    })
    addFormInput({
      id: 'maxSanity',
      name: 'maxSanity',
      placeholder: 'Sanidade Máxima',
      type: 'number',
      label: 'Sanidade Máxima',
      defaultValue: character.maxSanity.toString(),
    })
    setFormSubmitAction('Editar')
    setFormSubmitFunction((state, socket) => {
      const sanity = parseInt(
        state.dialog.content.inputs.find((input) => input.id === 'sanity')
          ?.value
      )
      const maxSanity = parseInt(
        state.dialog.content.inputs.find((input) => input.id === 'maxSanity')
          ?.value
      )

      if (sanity !== state.character.sanity) {
        console.log('Updating character sanity')
        socket.emit('updateCharacterSanity', { sanity })
      }

      if (maxSanity !== state.character.maxSanity) {
        console.log('Updating character maxSanity')
        socket.emit('updateCharacterMaxSanity', { maxSanity })
      }
    })

    toggleDialog()
  }, [character.sanity, character.maxSanity])
  return (
    <div onClick={editSanity} className='flex items-center'>
      <SanityIcon className='h-8 w-8 fill-lime9 mr-2' />
      <span>
        <span className='text-2xl text-lime11'>{formattedSanity}</span>
        <span className='text-lime12'>/{formattedMaxSanity}</span>
      </span>
    </div>
  )
}
