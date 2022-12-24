export function Header(props) {
  const { children } = props

  return (
    <header className='bg-violet2 py-4 mb-5 flex justify-center gap-12'>
      {children}
    </header>
  )
}
