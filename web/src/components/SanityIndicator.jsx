import { MdEmojiEmotions as ShieldIcon } from 'react-icons/md'

// MdShield
// MdHealthAndSafety
// MdEmojiEmotions
// MdLightbulb

export function SanityIndicator(props) {
  const { sanity, maxSanity } = props

  return (
    <div className='flex items-center'>
      <ShieldIcon className='h-8 w-8 fill-lime9 mr-2' />
      <span>
        <span className='text-2xl text-lime11'>{sanity}</span>
        <span className='text-lime12'>/{maxSanity}</span>
      </span>
    </div>
  )
}
