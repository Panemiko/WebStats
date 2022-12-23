export function LevelIndicator(props) {
  const { level } = props

  const formattedLevel = level.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

  return <span className='text-cyan11 uppercase'>LVL {formattedLevel}</span>
}
