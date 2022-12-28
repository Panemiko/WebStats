interface SubTitleProps {
  children: React.ReactNode
  color?: 'error' | 'default'
}

export function SubTitle(props: SubTitleProps) {
  const { children, color } = props

  return (
    <h2
      className={`${
        color === 'error' ? 'text-tomato11' : 'text-violet10'
      } font-medium text-xl block`}
    >
      {children}
    </h2>
  )
}
