import { useParams } from 'react-router-dom'

export function useGetIdFromParam() {
  return {
    getIdFromParam(paramName) {
      return parseInt(useParams()[paramName])
    },
  }
}
