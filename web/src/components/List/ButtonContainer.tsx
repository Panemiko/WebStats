interface ButtonContainerProps {
  children: React.ReactNode
}

export function ButtonContainer(props: ButtonContainerProps) {
  const { children } = props

  return <div className='px-8 pb-6 bg-mauve1 w-screen'>{children}</div>
}
