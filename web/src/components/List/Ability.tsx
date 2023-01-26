import { useDialog } from 'hooks/useDialog'
import { useNumberFormat } from 'hooks/useNumberFormat'
import { useStoreUpdate } from 'hooks/useStoreUpdate'
import { useCallback } from 'react'

import { Item } from './Item'
import { ItemInfo } from './ItemInfo'

interface AbilityProps {
  abilityId: number
}

export function Ability(props: AbilityProps) {
  const { abilityId } = props

  const { character } = useStoreUpdate()
  const { toTwoDigits } = useNumberFormat()
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

  const ability = character.abilities.find(
    (ability) => ability.id === abilityId
  )

  const formattedLevel = toTwoDigits(ability?.level || 0)

  const editAbility = useCallback(() => {
    resetDialog()

    setDialogTitle(`Editar habilidade (${ability?.name})`)
    addFormInput({
      id: 'abilityId',
      name: 'abilityId',
      placeholder: '',
      type: 'hidden',
      label: '',
      defaultValue: ability?.id.toString() || '',
    })
    addFormInput({
      id: 'abilityName',
      name: 'abilityName',
      placeholder: 'Nome',
      type: 'text',
      label: 'Nome da habilidade',
      defaultValue: ability?.name || '',
    })
    addFormInput({
      id: 'abilityLevel',
      name: 'abilityLevel',
      placeholder: 'Level',
      type: 'number',
      label: 'Level da Habilidade',
      defaultValue: ability?.level.toString() || '0',
    })
    setFormSubmitAction('Editar')
    setFormSubmitFunction((state, socket) => {
      const abilityId =
        parseInt(
          state.dialog.content.inputs.find((input) => input.id === 'abilityId')
            ?.value
        ) || -1

      const abilityName = state.dialog.content.inputs.find(
        (input) => input.id === 'abilityName'
      )?.value

      const abilityLevel =
        parseInt(
          state.dialog.content.inputs.find(
            (input) => input.id === 'abilityLevel'
          )?.value
        ) || 0

      console.log('Updating character ability')
      socket.emit('updateCharacterAbility', {
        id: abilityId,
        name: abilityName,
        level: abilityLevel,
      })
    })
    setFormSecondarySubmitAction('Excluir')
    setFormSecondarySubmitFunction((state, socket) => {
      const abilityId =
        parseInt(
          state.dialog.content.inputs.find((input) => input.id === 'abilityId')
            ?.value
        ) || 1

      console.log(`Deleting ability ${abilityId}`)
      socket.emit('deleteCharacterAbility', { abilityId })
    })

    toggleDialog()
  }, [character])

  return (
    <Item onClick={editAbility} name={ability?.name || ''}>
      <ItemInfo>{formattedLevel}</ItemInfo>
    </Item>
  )
}
