import { MdFavorite as HeartIcon } from 'react-icons/md'

export function LifeIndicator(props) {
  const { life, maxLife } = props

  return (
    <div className='flex items-center'>
      <HeartIcon className='h-8 w-8 fill-tomato9 mr-2' />
      <span>
        <span className='text-2xl text-tomato11'>{life}</span>
        <span className='text-tomato12'>/{maxLife}</span>
      </span>
    </div>
  )
}
