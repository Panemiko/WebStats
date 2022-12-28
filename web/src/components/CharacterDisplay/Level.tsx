import { useNumberFormat } from 'hooks/useNumberFormat'

interface LevelProps {
  level: number
}

export function Level(props: LevelProps) {
  const { level } = props

  const { toTwoDigits } = useNumberFormat()

  const formattedLevel = toTwoDigits(level)

  return <span className='text-cyan11 uppercase'>LVL {formattedLevel}</span>
}
