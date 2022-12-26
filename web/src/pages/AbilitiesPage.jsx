import { useAppSetup } from 'hooks/useAppSetup'
import { AbilitiesLayout } from 'layouts/AbilitiesLayout'

export function AbilitiesPage() {
  useAppSetup()

  return <AbilitiesLayout />
}
