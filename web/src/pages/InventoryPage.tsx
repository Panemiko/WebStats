import { ActionButton } from 'components/List/ActionButton'
import { Header } from 'components/List/Header'
import { Item } from 'components/List/Item'
import { ItemInfo } from 'components/List/ItemInfo'
import { ItemList } from 'components/List/ItemList'
import { SubTitle } from 'components/List/SubTitle'
import { Title } from 'components/List/Title'
import { useNumberFormat } from 'hooks/useNumberFormat'
import { useSetup } from 'hooks/useSetup'
import { useStoreUpdate } from 'hooks/useStoreUpdate'

export function InventoryPage() {
  useSetup()

  const { character } = useStoreUpdate()
  const { toTwoDigits, toTwoDecimals } = useNumberFormat()

  function calcTotalWeight() {
    let total = 0

    character?.items?.forEach((item) => {
      total += item.weight * item.quantity
    })

    return total
  }

  const totalWeight = calcTotalWeight()

  return (
    <div>
      <Header>
        <Title>Inventário</Title>
        <SubTitle
          color={totalWeight > character?.maxWeight ? 'error' : 'default'}
        >
          {toTwoDecimals(totalWeight)}kg/{character?.maxWeight}kg
        </SubTitle>
      </Header>
      <ItemList>
        {character?.items?.map((item) => (
          <Item key={item.id} name={item.name}>
            <div className='flex items-center gap-2 pl-2'>
              <ItemInfo variation={2}>{item.weight}kg</ItemInfo>
              <ItemInfo>{toTwoDigits(item.quantity)}</ItemInfo>
            </div>
          </Item>
        ))}
      </ItemList>
      <ActionButton
        onClick={() => {
          console.log('Click')
        }}
      >
        ADICIONAR
      </ActionButton>
    </div>
  )
}
