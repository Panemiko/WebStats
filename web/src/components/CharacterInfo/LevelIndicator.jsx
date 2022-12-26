import { useNumberFormat } from 'hooks/useNumberFormat'

export function LevelIndicator(props) {
  const { level } = props

  const { formatNumberToTwoDigits } = useNumberFormat()

  const formattedLevel = formatNumberToTwoDigits(level || 0)

  return <span className='text-cyan11 uppercase'>LVL {formattedLevel}</span>
}
