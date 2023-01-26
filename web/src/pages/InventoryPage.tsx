import { ActionButton } from 'components/ActionButton'
import { Dialog } from 'components/Dialog'
import { ButtonContainer } from 'components/List/ButtonContainer'
import { Header } from 'components/List/Header'
import { InventoryItem } from 'components/List/InventoryItem'
import { ItemList } from 'components/List/ItemList'
import { Title } from 'components/List/Title'
import { Weight } from 'components/List/Weight'
import { useDialog } from 'hooks/useDialog'
import { useSetup } from 'hooks/useSetup'
import { useStoreUpdate } from 'hooks/useStoreUpdate'
import { useCallback } from 'react'

export function InventoryPage() {
  useSetup()

  const { character } = useStoreUpdate()

  const {
    addFormInput,
    resetDialog,
    setDialogTitle,
    toggleDialog,
    setFormSubmitAction,
    setFormSubmitFunction,
  } = useDialog()

  const addItem = useCallback(() => {
    resetDialog()

    setDialogTitle('Adicionar item')
    addFormInput({
      id: 'itemName',
      name: 'itemName',
      placeholder: 'Nome',
      type: 'text',
      label: 'Nome do item',
      defaultValue: '',
    })
    addFormInput({
      id: 'itemWeight',
      name: 'itemWeight',
      placeholder: 'Peso',
      type: 'number',
      label: 'Peso do Item',
      defaultValue: '0',
    })
    addFormInput({
      id: 'itemQuantity',
      name: 'itemQuantity',
      placeholder: 'Quantidade',
      type: 'number',
      label: 'Quantidade',
      defaultValue: '0',
    })
    setFormSubmitAction('Adicionar')
    setFormSubmitFunction((state, socket) => {
      const itemName = state.dialog.content.inputs.find(
        (input) => input.id === 'itemName'
      )?.value

      const itemWeight =
        parseInt(
          state.dialog.content.inputs.find((input) => input.id === 'itemWeight')
            ?.value
        ) || 0

      const itemQuantity =
        parseInt(
          state.dialog.content.inputs.find(
            (input) => input.id === 'itemQuantity'
          )?.value
        ) || 0

      console.log('Adding character item')
      socket.emit('addCharacterItem', {
        name: itemName,
        weight: itemWeight,
        quantity: itemQuantity,
      })
    })

    toggleDialog()
  }, [character])

  return (
    <div>
      <Dialog />
      <Header>
        <Title>Inventário</Title>
        <Weight />
      </Header>
      <ItemList>
        {character?.items?.map((item) => (
          <InventoryItem itemId={item.id} key={item.id} />
        ))}
      </ItemList>
      <ButtonContainer>
        <ActionButton onClick={addItem}>ADICIONAR</ActionButton>
      </ButtonContainer>
    </div>
  )
}
