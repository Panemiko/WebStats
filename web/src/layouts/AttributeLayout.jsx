import { Header } from 'components/List/Header'
import { Item } from 'components/List/Item'
import { SubTitle } from 'components/List/SubTitle'
import { Title } from 'components/List/Title'
import { useGetIdFromParam } from 'hooks/useGetIdFromParam'
import { useNumberFormat } from 'hooks/useNumberFormat'
import { useStoreUpdate } from 'hooks/useStoreUpdate'

export function AttributeLayout() {
  const { skills, attributes, character } = useStoreUpdate()
  const { getIdFromParam } = useGetIdFromParam()
  const { formatNumberToTwoDigits } = useNumberFormat()

  const attributeId = getIdFromParam('attributeId')

  const attribute = attributes?.find(
    (attribute) => attribute.id === attributeId
  )

  return (
    <div>
      <Header>
        <Title>{attribute?.name}</Title>
        <SubTitle>
          {formatNumberToTwoDigits(
            character?.attributes.find(
              (attribute) => attribute.attributeId === attributeId
            )?.level || 0
          )}
        </SubTitle>
      </Header>
      {skills
        ?.filter((skill) => skill?.attributeId === attributeId)
        ?.map((skill) => (
          <Item key={skill?.id} name={skill?.name} />
        ))}
    </div>
  )
}
