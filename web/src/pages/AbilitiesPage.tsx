import { ActionButton } from 'components/List/ActionButton'
import { Header } from 'components/List/Header'
import { Item } from 'components/List/Item'
import { ItemList } from 'components/List/ItemList'
import { Title } from 'components/List/Title'
import { useSetup } from 'hooks/useSetup'
import { useStoreUpdate } from 'hooks/useStoreUpdate'

export function AbilitiesPage() {
  useSetup()

  const { character } = useStoreUpdate()

  return (
    <div>
      <Header>
        <Title>Habilidades</Title>
      </Header>
      <ItemList>
        {character?.abilities?.map((item) => (
          <Item key={item.id} name={item.name} />
        ))}
      </ItemList>
      <ActionButton
        onClick={() => {
          console.log('click')
        }}
      >
        ADICIONAR
      </ActionButton>
    </div>
  )
}
