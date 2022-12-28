interface HeaderProps {
  children: React.ReactNode
}

export function Header(props: HeaderProps) {
  const { children } = props

  return (
    <header className='bg-violet2 py-4 mb-5 flex justify-center items-center gap-12'>
      {children}
    </header>
  )
}
