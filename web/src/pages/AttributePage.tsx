import { Dialog } from 'components/Dialog'
import { Header } from 'components/List/Header'
import { Item } from 'components/List/Item'
import { ItemInfo } from 'components/List/ItemInfo'
import { ItemList } from 'components/List/ItemList'
import { SubTitle } from 'components/List/SubTitle'
import { Title } from 'components/List/Title'
import { useGetLinkId } from 'hooks/useGetLinkId'
import { useNumberFormat } from 'hooks/useNumberFormat'
import { useSetup } from 'hooks/useSetup'
import { useStoreUpdate } from 'hooks/useStoreUpdate'

export function AttributePage() {
  useSetup()

  const { getIdFromLink } = useGetLinkId()
  const { toTwoDigits } = useNumberFormat()
  const {
    character,
    meta: { attributes, skills },
  } = useStoreUpdate()

  const attributeId = getIdFromLink('attributeId')

  const attributeLoaded = attributes.find(
    (attribute) => attribute.id === attributeId
  )

  return (
    <div>
      <Dialog />
      <Header>
        <Title>{attributeLoaded?.name as string}</Title>
        <SubTitle>
          {toTwoDigits(
            character?.attributes?.find(
              (attribute) => attribute.attributeId === attributeId
            )?.level || 0
          )}
        </SubTitle>
      </Header>
      <ItemList>
        {skills
          ?.filter((skill) => skill.attributeId === attributeId)
          ?.map((skill) => (
            <Item key={skill.id} name={skill.name}>
              <div>
                <ItemInfo>
                  {toTwoDigits(
                    character?.skills?.find(
                      (charSkill) => charSkill.skillId === skill.id
                    )?.level || 0
                  )}
                </ItemInfo>
              </div>
            </Item>
          ))}
      </ItemList>
    </div>
  )
}
