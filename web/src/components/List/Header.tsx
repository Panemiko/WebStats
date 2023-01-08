interface HeaderProps {
  children: React.ReactNode
  onClick?: () => any
}

export function Header(props: HeaderProps) {
  const { children, onClick } = props

  return (
    <header
      onClick={onClick}
      className='bg-violet2 py-4 mb-5 flex justify-center items-center gap-12'
    >
      {children}
    </header>
  )
}
