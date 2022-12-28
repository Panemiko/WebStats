import { useNavigation } from 'hooks/useNavigation'
import { store } from 'lib/store'
import { useCallback } from 'react'
import type { IconType } from 'react-icons'

interface IconButtonProps {
  Icon: IconType
  href: string
}

export function IconButton(props: IconButtonProps) {
  const { Icon, href } = props

  const { navigateTo } = useNavigation()

  const handleButtonClick = useCallback(() => {
    const { character } = store.getState()
    navigateTo(`/character/${character.id}/${href}`)
  }, [])

  return (
    <button
      onClick={handleButtonClick}
      className='p-4 bg-violet9 rounded-2xl h-20 w-20 hover:bg-violet10'
    >
      <Icon className='fill-violet12 h-12 w-12' />
    </button>
  )
}
