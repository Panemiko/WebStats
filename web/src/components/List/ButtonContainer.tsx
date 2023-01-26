interface ButtonContainerProps {
  children: React.ReactNode
}

export function ButtonContainer(props: ButtonContainerProps) {
  const { children } = props

  return (
    <div className='px-8 py-6 sticky bottom-0 bg-mauve1 left-0 w-screen'>
      {children}
    </div>
  )
}
