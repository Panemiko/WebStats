import { useAppSetup } from 'hooks/useAppSetup'
import { CharacterLayout } from 'layouts/CharacterLayout'

export function CharacterPage() {
  useAppSetup()

  return <CharacterLayout />
}
