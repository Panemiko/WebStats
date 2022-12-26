import { useStoreUpdate } from 'hooks/useStoreUpdate'
import { useNavigate } from 'react-router-dom'

export function useNavigation() {
  const navigate = useNavigate()

  const state = useStoreUpdate()

  return {
    navigateTo(href) {
      navigate(href, { state })
    },
  }
}
