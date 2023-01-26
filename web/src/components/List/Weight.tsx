import { useDialog } from 'hooks/useDialog'
import { useNumberFormat } from 'hooks/useNumberFormat'
import { useStoreUpdate } from 'hooks/useStoreUpdate'
import { useCallback } from 'react'

import { SubTitle } from './SubTitle'

export function Weight() {
  const { toTwoDecimals } = useNumberFormat()
  const { character } = useStoreUpdate()
  const {
    addFormInput,
    resetDialog,
    setDialogTitle,
    toggleDialog,
    setFormSubmitAction,
    setFormSubmitFunction,
  } = useDialog()

  function calcTotalWeight() {
    let total = 0

    character?.items?.forEach((item) => {
      total += item.weight * item.quantity
    })

    return total
  }

  const totalWeight = calcTotalWeight()
  const formattedTotalWeight = toTwoDecimals(totalWeight)

  const editMaxWeight = useCallback(() => {
    resetDialog()

    setDialogTitle('Editar Peso Máximo')
    addFormInput({
      id: 'maxWeight',
      name: 'maxWeight',
      placeholder: 'Peso máximo',
      type: 'number',
      label: 'Peso máximo',
      decimalPoints: true,
      defaultValue: character.maxWeight.toString() || '',
    })
    setFormSubmitAction('Editar')
    setFormSubmitFunction((state, socket) => {
      const maxWeight =
        parseFloat(
          state.dialog.content.inputs.find((input) => input.id === 'maxWeight')
            ?.value
        ) || 0

      console.log('Updating character maxWeight')
      socket.emit('updateCharacterMaxWeight', {
        maxWeight,
      })
    })

    toggleDialog()
  }, [character])

  return (
    <SubTitle
      onClick={editMaxWeight}
      color={totalWeight > character?.maxWeight ? 'error' : 'default'}
    >
      {formattedTotalWeight}kg/{character.maxWeight}kg
    </SubTitle>
  )
}
