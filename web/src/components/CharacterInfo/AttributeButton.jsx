import { useAttributeHref } from 'hooks/useAttributeHref'
import { useNavigation } from 'hooks/useNavigation'
import { useNumberFormat } from 'hooks/useNumberFormat'
import { useCallback } from 'react'

export function AttributeButton(props) {
  const { level, tag, attributeId } = props

  const { formatNumberToTwoDigits } = useNumberFormat()
  const { navigateTo } = useNavigation()
  const { getAttributeHref } = useAttributeHref()

  const formattedLevel = formatNumberToTwoDigits(level || 0)

  const onClick = useCallback(() => {
    navigateTo(getAttributeHref(attributeId))
  }, [])

  return (
    <div className='flex flex-col text-center'>
      <button
        onClick={onClick}
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
