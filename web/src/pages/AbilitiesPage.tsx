import { ActionButton } from 'components/ActionButton'
import { Dialog } from 'components/Dialog'
import { Ability } from 'components/List/Ability'
import { Header } from 'components/List/Header'
import { ItemList } from 'components/List/ItemList'
import { Title } from 'components/List/Title'
import { useDialog } from 'hooks/useDialog'
import { useSetup } from 'hooks/useSetup'
import { useStoreUpdate } from 'hooks/useStoreUpdate'
import { useCallback } from 'react'

export function AbilitiesPage() {
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

  const addAbility = useCallback(() => {
    resetDialog()

    setDialogTitle('Adicionar habilidade')
    addFormInput({
      id: 'abilityName',
      name: 'abilityName',
      placeholder: 'Nome',
      type: 'text',
      label: 'Nome da habilidade',
      defaultValue: '',
    })
    addFormInput({
      id: 'abilityLevel',
      name: 'abilityLevel',
      placeholder: 'Level',
      type: 'number',
      label: 'Level da Habilidade',
      defaultValue: '0',
    })
    setFormSubmitAction('Adicionar')
    setFormSubmitFunction((state, socket) => {
      const abilityName = state.dialog.content.inputs.find(
        (input) => input.id === 'abilityName'
      )?.value

      const abilityLevel =
        parseInt(
          state.dialog.content.inputs.find(
            (input) => input.id === 'abilityLevel'
          )?.value
        ) || 0

      console.log('Adding new ability')
      socket.emit('addCharacterAbility', {
        name: abilityName,
        level: abilityLevel,
      })
    })

    toggleDialog()
  }, [character])

  return (
    <div>
      <Dialog />
      <Header>
        <Title>Habilidades</Title>
      </Header>
      <ItemList>
        {character?.abilities?.map((ability) => (
          <Ability abilityId={ability.id} key={ability.id} />
        ))}
      </ItemList>
      <div className='px-8 pb-6'>
        <ActionButton onClick={addAbility}>ADICIONAR</ActionButton>
      </div>
    </div>
  )
}
