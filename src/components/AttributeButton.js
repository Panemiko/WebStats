import { useCallback } from 'react'

export function AttributeButton(props) {
  const { level, tag } = props

  const formattedLevel = level.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

  const onClick = useCallback(() => {}, [])

  return (
    <div className='flex flex-col'>
      <button
        onClick={onClick}
        className='h-20 w-20 rounded-3xl bg-cyan9 text-cyan12 font-bold text-2xl border-4 border-cyan6 mb-3'
      >
        {formattedLevel}
      </button>
      <span className='font-black text-cyan11 text-center uppercase'>
        {tag}
      </span>
    </div>
  )
}
