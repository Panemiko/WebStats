import { useNumberFormat } from 'hooks/useNumberFormat'
import { MdEmojiEmotions as SanityIcon } from 'react-icons/md'

interface SanityProps {
  sanity: number
  maxSanity: number
}

export function Sanity(props: SanityProps) {
  const { maxSanity, sanity } = props

  const { toTwoDigits } = useNumberFormat()

  const formattedSanity = toTwoDigits(sanity)

  return (
    <div className='flex items-center'>
      <SanityIcon className='h-8 w-8 fill-lime9 mr-2' />
      <span>
        <span className='text-2xl text-lime11'>{formattedSanity}</span>
        <span className='text-lime12'>/{maxSanity}</span>
      </span>
    </div>
  )
}
