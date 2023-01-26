interface ActionButtonProps {
  children: React.ReactNode
  onClick(...params: any): any
  variant?: 'primary' | 'secondary'
}

export function ActionButton(props: ActionButtonProps) {
  const { children, onClick, variant = 'primary' } = props

  return (
    <button
      className={`uppercase text-violet12 text-xl rounded-md py-3 w-[stretch] ${
        variant === 'secondary'
          ? 'bg-mauve9 hover:bg-mauve10 active:bg-mauve10 font-medium'
          : 'bg-violet9 hover:bg-violet10 active:bg-violet10 font-semibold'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
