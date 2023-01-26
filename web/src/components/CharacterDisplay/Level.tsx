import { useDialog } from 'hooks/useDialog'
import { useNumberFormat } from 'hooks/useNumberFormat'
import { useStoreUpdate } from 'hooks/useStoreUpdate'
import { useCallback } from 'react'

export function Level() {
  const { character } = useStoreUpdate()
  const { toTwoDigits } = useNumberFormat()
  const {
    addFormInput,
    resetDialog,
    setDialogTitle,
    toggleDialog,
    setFormSubmitAction,
    setFormSubmitFunction,
  } = useDialog()

  const editLevel = useCallback(() => {
    resetDialog()

    setDialogTitle('Editar Level')
    addFormInput({
      id: 'level',
      name: 'level',
      placeholder: 'Level',
      type: 'number',
      label: 'Level',
      defaultValue: character.level.toString(),
    })
    setFormSubmitAction('Editar')
    setFormSubmitFunction((state, socket) => {
      const level =
        parseInt(
          state.dialog.content.inputs.find((input) => input.id === 'level')
            ?.value
        ) || 0

      console.log('Updating character level')
      socket.emit('updateCharacterLevel', { level })
    })

    toggleDialog()
  }, [character.level])

  return (
    <span className='text-cyan11 uppercase outline-none'>
      LVL <span onClick={editLevel}>{toTwoDigits(character.level || 0)}</span>
    </span>
  )
}
