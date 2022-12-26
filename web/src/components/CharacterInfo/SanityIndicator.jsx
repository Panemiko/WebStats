import { MdEmojiEmotions as SanityIcon } from 'react-icons/md'

// Possible icons
// MdShield
// MdHealthAndSafety
// MdEmojiEmotions
// MdLightbulb

export function SanityIndicator(props) {
  const { sanity, maxSanity } = props

  return (
    <div className='flex items-center'>
      <SanityIcon className='h-8 w-8 fill-lime9 mr-2' />
      <span>
        <span className='text-2xl text-lime11'>{sanity}</span>
        <span className='text-lime12'>/{maxSanity}</span>
      </span>
    </div>
  )
}
