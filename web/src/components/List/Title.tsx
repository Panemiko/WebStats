interface TitleProps {
  children: string
}

export function Title(props: TitleProps) {
  const { children } = props

  return (
    <h1 className='font-bold text-2xl w-min text-violet11 uppercase'>
      {children}
    </h1>
  )
}
