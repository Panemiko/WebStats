interface ActionButtonProps {
  children: React.ReactNode
  onClick(...params: any): any
}

export function ActionButton(props: ActionButtonProps) {
  const { children, onClick } = props

  return (
    <button
      className='bg-violet9 hover:bg-violet10 active:bg-violet10 uppercase font-semibold text-violet12 text-xl rounded-md py-3 w-[stretch]'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
