import { store } from 'lib/store'
import { useNavigate } from 'react-router-dom'

export function useNavigation() {
  const navigate = useNavigate()

  return {
    navigateTo(href: string) {
      const state = store.getState()
      navigate(href, { state })
    },
  }
}
