import { useDialog } from 'hooks/useDialog'
import { useNumberFormat } from 'hooks/useNumberFormat'
import { useStoreUpdate } from 'hooks/useStoreUpdate'
import { useCallback } from 'react'

import { Item } from './Item'
import { ItemInfo } from './ItemInfo'

interface InventoryItemProps {
  itemId: number
}

export function InventoryItem(props: InventoryItemProps) {
  const { itemId } = props

  const { character } = useStoreUpdate()
  const { toTwoDigits, toTwoDecimals } = useNumberFormat()
  const {
    addFormInput,
    resetDialog,
    setDialogTitle,
    toggleDialog,
    setFormSubmitAction,
    setFormSubmitFunction,
    setFormSecondarySubmitAction,
    setFormSecondarySubmitFunction,
  } = useDialog()

  const item = character.items.find((item) => item.id === itemId)

  const formattedWeight = toTwoDecimals(item?.weight || 0)
  const formattedQuantity = toTwoDigits(item?.quantity || 0)

  const editItem = useCallback(() => {
    resetDialog()

    setDialogTitle(`Editar item (${item?.name})`)
    addFormInput({
      id: 'itemId',
      name: 'itemId',
      placeholder: '',
      type: 'hidden',
      label: '',
      defaultValue: item?.id.toString() || '',
    })
    addFormInput({
      id: 'itemName',
      name: 'itemName',
      placeholder: 'Nome',
      type: 'text',
      label: 'Nome do item',
      defaultValue: item?.name || '',
    })
    addFormInput({
      id: 'itemWeight',
      name: 'itemWeight',
      placeholder: 'Peso',
      type: 'number',
      label: 'Peso do Item',
      decimalPoints: true,
      defaultValue: item?.weight.toString() || '0',
    })
    addFormInput({
      id: 'itemQuantity',
      name: 'itemQuantity',
      placeholder: 'Quantidade',
      type: 'number',
      label: 'Quantidade',
      defaultValue: item?.quantity.toString() || '0',
    })
    setFormSubmitAction('Editar')
    setFormSubmitFunction((state, socket) => {
      const itemId =
        parseInt(
          state.dialog.content.inputs.find((input) => input.id === 'itemId')
            ?.value
        ) || -1

      const itemName = state.dialog.content.inputs.find(
        (input) => input.id === 'itemName'
      )?.value

      const itemWeight =
        parseFloat(
          state.dialog.content.inputs.find((input) => input.id === 'itemWeight')
            ?.value
        ) || 0

      const itemQuantity =
        parseInt(
          state.dialog.content.inputs.find(
            (input) => input.id === 'itemQuantity'
          )?.value
        ) || 0

      console.log('Updating character item')
      socket.emit('updateCharacterItem', {
        id: itemId,
        name: itemName,
        weight: itemWeight,
        quantity: itemQuantity,
      })
    })
    setFormSecondarySubmitAction('Excluir')
    setFormSecondarySubmitFunction((state, socket) => {
      const itemId =
        parseInt(
          state.dialog.content.inputs.find((input) => input.id === 'itemId')
            ?.value
        ) || -1

      console.log(`Deleting item ${itemId}`)
      socket.emit('deleteCharacterItem', { itemId })
    })

    toggleDialog()
  }, [character])

  return (
    <Item onClick={editItem} name={item?.name || ''}>
      <div className='flex items-center gap-2 pl-2'>
        <ItemInfo variation={2}>{formattedWeight}kg</ItemInfo>
        <ItemInfo>{formattedQuantity}</ItemInfo>
      </div>
    </Item>
  )
}
