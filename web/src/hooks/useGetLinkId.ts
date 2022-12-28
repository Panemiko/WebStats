import { useParams } from 'react-router-dom'

export function useGetLinkId() {
  return {
    getIdFromLink(paramName: string) {
      return parseInt(useParams()[paramName] || '')
    },
  }
}
