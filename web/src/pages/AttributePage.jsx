import { useAppSetup } from 'hooks/useAppSetup'
import { AttributeLayout } from 'layouts/AttributeLayout'

export function AttributePage() {
  useAppSetup()

  return <AttributeLayout />
}
