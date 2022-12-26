import { useNavigation } from 'hooks/useNavigation'
import { store } from 'lib/store'

export function IconButton(props) {
  const { Icon, href } = props

  const { navigateTo } = useNavigation()

  return (
    <button
      onClick={() => {
        const { character } = store.getState()

        navigateTo(`/character/${character.id}/${href}`)
      }}
      className='p-4 bg-violet9 rounded-2xl h-20 w-20 hover:bg-violet10'
    >
      <Icon className='fill-violet12 h-12 w-12' />
    </button>
  )
}
