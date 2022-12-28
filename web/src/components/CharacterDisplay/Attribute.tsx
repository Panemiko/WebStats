import { useAttributeLink } from 'hooks/useAttributeLink'
import { useNavigation } from 'hooks/useNavigation'
import { useNumberFormat } from 'hooks/useNumberFormat'
import { useCallback } from 'react'

interface AttributeProps {
  attributeId: number
  level: number
  tag: string
}

export function Attribute(props: AttributeProps) {
  const { attributeId, level, tag } = props

  const { toTwoDigits } = useNumberFormat()
  const { navigateTo } = useNavigation()
  const { getAttributeLink } = useAttributeLink()

  const formattedLevel = toTwoDigits(level)

  const handleAttributeClick = useCallback(() => {
    navigateTo(getAttributeLink(attributeId))
  }, [])

  return (
    <div className='flex flex-col text-center'>
      <button
        onClick={handleAttributeClick}
        className='h-20 w-20 rounded-3xl bg-cyan9 text-cyan12 font-bold text-2xl border-4 border-cyan6 mb-3 hover:bg-cyan10 active:bg-cyan10'
      >
        {formattedLevel}
      </button>
      <span className='font-black text-cyan11 text-center uppercase'>
        {tag}
      </span>
    </div>
  )
}
