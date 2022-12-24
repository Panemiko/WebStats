import { Header } from 'components/List/Header'
import { Item } from 'components/List/Item'
import { SubTitle } from 'components/List/SubTitle'
import { Title } from 'components/List/Title'
import { metaContext } from 'contexts/MetaContext'
import { roomContext } from 'contexts/RoomContext'
import { useContext } from 'react'

export function AttributeLayout() {
  const { skills, attributes, character } = useContext(metaContext)
  const { room } = useContext(roomContext)

  const attributeId = room.selector

  return (
    <div>
      <Header>
        <Title>
          {attributes.find((attribute) => attribute.id === attributeId).name}
        </Title>
        <SubTitle>
          {(
            character.attributes.find(
              (attribute) => attribute.id === attributeId
            ).level || 0
          ).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </SubTitle>
      </Header>
      {skills
        .filter((skill) => skill.attributeId === attributeId)
        .map((skill) => (
          <Item key={skill.id} name={skill.name} />
        ))}
    </div>
  )
}
