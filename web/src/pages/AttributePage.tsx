import { Dialog } from 'components/Dialog'
import { Header } from 'components/List/Header'
import { ItemList } from 'components/List/ItemList'
import { Skill } from 'components/List/Skill'
import { SubTitle } from 'components/List/SubTitle'
import { Title } from 'components/List/Title'
import { useDialog } from 'hooks/useDialog'
import { useGetLinkId } from 'hooks/useGetLinkId'
import { useNumberFormat } from 'hooks/useNumberFormat'
import { useSetup } from 'hooks/useSetup'
import { useStoreUpdate } from 'hooks/useStoreUpdate'
import { useCallback, useMemo } from 'react'

export function AttributePage() {
  useSetup()

  const { getIdFromLink } = useGetLinkId()
  const { toTwoDigits } = useNumberFormat()
  const {
    character,
    meta: { attributes, skills },
  } = useStoreUpdate()
  const {
    addFormInput,
    resetDialog,
    setDialogTitle,
    toggleDialog,
    setFormSubmitAction,
    setFormSubmitFunction,
  } = useDialog()

  const attributeId = getIdFromLink('attributeId')

  const attributeLoaded = useMemo(() => {
    return attributes?.find((attribute) => attribute.id === attributeId)
  }, [attributes])

  const characterAttributeLoaded = useMemo(() => {
    return character?.attributes?.find(
      (attribute) => attribute.attributeId === attributeId
    )
  }, [character])

  const editLevel = useCallback(() => {
    resetDialog()

    setDialogTitle(`Editar Level (${attributeLoaded?.name})`)
    addFormInput({
      id: 'attributeId',
      name: 'attributeId',
      placeholder: '',
      type: 'hidden',
      label: '',
      defaultValue: attributeLoaded?.id.toString() || '0',
    })
    addFormInput({
      id: 'attributeLevel',
      name: 'attributeLevel',
      placeholder: 'Level de Atributo',
      type: 'number',
      label: 'Level de Atributo',
      defaultValue: characterAttributeLoaded?.level.toString() || '0',
    })
    setFormSubmitAction('Editar')
    setFormSubmitFunction((state, socket) => {
      const attributeId =
        parseInt(
          state.dialog.content.inputs.find(
            (input) => input.id === 'attributeId'
          )?.value
        ) || -1

      const attributeLevel =
        parseInt(
          state.dialog.content.inputs.find(
            (input) => input.id === 'attributeLevel'
          )?.value
        ) || 0

      console.log('Updating attributeLevel')
      socket.emit('updateCharacterAttributeLevel', {
        attributeId,
        level: attributeLevel,
      })
    })

    toggleDialog()
  }, [attributeLoaded, characterAttributeLoaded])

  return (
    <div>
      <Dialog />
      <Header onClick={editLevel}>
        <Title>{attributeLoaded?.name as string}</Title>
        <SubTitle>{toTwoDigits(characterAttributeLoaded?.level || 0)}</SubTitle>
      </Header>
      <ItemList>
        {skills
          ?.filter((skill) => skill.attributeId === attributeId)
          ?.map((skill) => (
            <Skill skillId={skill.id} key={skill.id} />
          ))}
      </ItemList>
    </div>
  )
}
