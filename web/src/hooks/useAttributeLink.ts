import { store } from 'lib/store'

export function useAttributeLink() {
  return {
    getAttributeLink(attributeId: number) {
      const characterId = store.getState().character.id

      return `/character/${characterId}/attribute/${attributeId}`
    },
  }
}
