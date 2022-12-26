import { store } from 'lib/store'

export function useAttributeHref() {
  const { character } = store.getState()

  return {
    getAttributeHref(attributeId) {
      return `/character/${character.id}/attribute/${attributeId}`
    },
  }
}
