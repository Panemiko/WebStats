export function CharacterInfo(props) {
  const { name, age } = props

  return (
    <span>
      <span className='text-violet12 font-medium text-2xl'>{name} </span>
      <span className='text-violet11 font-normal'>{age}</span>
    </span>
  )
}
