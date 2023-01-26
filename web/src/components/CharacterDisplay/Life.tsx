import { useDialog } from 'hooks/useDialog'
import { useNumberFormat } from 'hooks/useNumberFormat'
import { useStoreUpdate } from 'hooks/useStoreUpdate'
import { useCallback } from 'react'
import { MdFavorite as HeartIcon } from 'react-icons/md'

export function Life() {
  const { character } = useStoreUpdate()
  const { toTwoDigits } = useNumberFormat()

  const formattedLife = toTwoDigits(character.life || 0)
  const formattedMaxLife = toTwoDigits(character.maxLife || 0)

  const {
    addFormInput,
    resetDialog,
    setDialogTitle,
    toggleDialog,
    setFormSubmitAction,
    setFormSubmitFunction,
  } = useDialog()

  const editLife = useCallback(() => {
    resetDialog()

    setDialogTitle('Editar Vida')
    addFormInput({
      id: 'life',
      name: 'life',
      placeholder: 'Vida',
      type: 'number',
      label: 'Vida',
      defaultValue: character.life.toString(),
    })
    addFormInput({
      id: 'maxLife',
      name: 'maxLife',
      placeholder: 'Vida Máxima',
      type: 'number',
      label: 'Vida Máxima',
      defaultValue: character.maxLife.toString(),
    })
    setFormSubmitAction('Editar')
    setFormSubmitFunction((state, socket) => {
      const life =
        parseInt(
          state.dialog.content.inputs.find((input) => input.id === 'life')
            ?.value
        ) || 0

      const maxLife =
        parseInt(
          state.dialog.content.inputs.find((input) => input.id === 'maxLife')
            ?.value
        ) || 0

      if (life !== state.character.life) {
        console.log('Updating character life')
        socket.emit('updateCharacterLife', { life })
      }

      if (maxLife !== state.character.maxLife) {
        console.log('Updating character maxlife')
        socket.emit('updateCharacterMaxlife', { maxLife })
      }
    })

    toggleDialog()
  }, [character.life, character.maxLife])

  return (
    <div onClick={editLife} className='flex items-center'>
      <HeartIcon className='h-8 w-8 fill-tomato9 mr-2' />
      <span>
        <span className='text-2xl text-tomato11'>{formattedLife}</span>
        <span className='text-tomato12'>/{formattedMaxLife}</span>
      </span>
    </div>
  )
}
