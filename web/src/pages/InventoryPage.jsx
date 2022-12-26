import { useAppSetup } from 'hooks/useAppSetup'
import { InventoryLayout } from 'layouts/InventoryLayout'

export function InventoryPage() {
  useAppSetup()

  return <InventoryLayout />
}
