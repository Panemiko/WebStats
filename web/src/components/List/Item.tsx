interface ItemProps {
  children?: React.ReactNode
  name: string
  onClick?: () => any
}

export function Item(props: ItemProps) {
  const { children, name, onClick } = props

  return (
    <li
      onClick={onClick}
      className={`bg-violet3 hover:bg-violet4 active:bg-violet5 mb-1 px-8 py-3 flex items-center ${
        children ? 'justify-between' : 'justify-start'
      }`}
    >
      <span className='text-violet12 capitalize break-all text-lg'>{name}</span>
      {children}
    </li>
  )
}
