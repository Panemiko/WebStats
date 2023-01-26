interface SubTitleProps {
  children: React.ReactNode
  color?: 'error' | 'default'
  onClick?: () => any
}

export function SubTitle(props: SubTitleProps) {
  const { children, color, onClick } = props

  return (
    <h2
      onClick={onClick}
      className={`${
        color === 'error' ? 'text-tomato11' : 'text-violet10'
      } font-medium text-xl block`}
    >
      {children}
    </h2>
  )
}
