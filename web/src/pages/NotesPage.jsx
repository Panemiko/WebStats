import { useAppSetup } from 'hooks/useAppSetup'
import { NotesLayout } from 'layouts/NotesLayout'

export function NotesPage() {
  useAppSetup()

  return <NotesLayout />
}
