import { useDialog } from 'hooks/useDialog'
import { useNumberFormat } from 'hooks/useNumberFormat'
import { useStoreUpdate } from 'hooks/useStoreUpdate'
import { useCallback, useMemo } from 'react'

import { Item } from './Item'
import { ItemInfo } from './ItemInfo'

interface SkillProps {
  skillId: number
}

export function Skill(props: SkillProps) {
  const { skillId } = props

  const {
    character,
    meta: { skills },
  } = useStoreUpdate()
  const { toTwoDigits } = useNumberFormat()
  const {
    addFormInput,
    resetDialog,
    setDialogTitle,
    toggleDialog,
    setFormSubmitAction,
    setFormSubmitFunction,
  } = useDialog()

  const skill = useMemo(
    () => skills.find((skill) => skill.id === skillId),
    [skillId, skills]
  )

  const characterSkill = useMemo(
    () =>
      character?.skills?.find((charSkill) => charSkill.skillId === skill?.id),
    [character.skills]
  )

  const formattedSkillLevel = useMemo(
    () => toTwoDigits(characterSkill?.level || 0),
    [characterSkill]
  )

  const editSkillLevel = useCallback(() => {
    resetDialog()

    setDialogTitle(`Editar Level (${skill?.name})`)
    addFormInput({
      id: 'skillId',
      name: 'skillId',
      placeholder: '',
      type: 'hidden',
      label: '',
      defaultValue: skill?.id.toString() || '0',
    })
    addFormInput({
      id: 'skillLevel',
      name: 'skillLevel',
      placeholder: 'Level de Perícia',
      type: 'number',
      label: 'Level de Perícia',
      defaultValue: characterSkill?.level.toString() || '0',
    })
    setFormSubmitAction('Editar')
    setFormSubmitFunction((state, socket) => {
      const skillId =
        parseInt(
          state.dialog.content.inputs.find((input) => input.id === 'skillId')
            ?.value
        ) || -1

      const skillLevel =
        parseInt(
          state.dialog.content.inputs.find((input) => input.id === 'skillLevel')
            ?.value
        ) || 0

      console.log('Updating skillLevel')
      socket.emit('updateCharacterSkillLevel', {
        skillId,
        level: skillLevel,
      })
    })

    toggleDialog()
  }, [character])

  return (
    <Item onClick={editSkillLevel} name={skill?.name || ''}>
      <div>
        <ItemInfo>{formattedSkillLevel}</ItemInfo>
      </div>
    </Item>
  )
}
