interface InformationProps {
  name: string
  age: number
}

export function Information(props: InformationProps) {
  const { age, name } = props

  return (
    <span>
      <span className='text-violet12 font-medium text-2xl'>{name} </span>
      <span className='text-violet11 font-normal'>{age}</span>
    </span>
  )
}
