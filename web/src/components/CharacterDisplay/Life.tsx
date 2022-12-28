import { useNumberFormat } from 'hooks/useNumberFormat'
import { MdFavorite as HeartIcon } from 'react-icons/md'

interface LifeProps {
  life: number
  maxLife: number
}

export function Life(props: LifeProps) {
  const { life, maxLife } = props

  const { toTwoDigits } = useNumberFormat()

  const formattedLife = toTwoDigits(life)

  return (
    <div className='flex items-center'>
      <HeartIcon className='h-8 w-8 fill-tomato9 mr-2' />
      <span>
        <span className='text-2xl text-tomato11'>{formattedLife}</span>
        <span className='text-tomato12'>/{maxLife}</span>
      </span>
    </div>
  )
}
