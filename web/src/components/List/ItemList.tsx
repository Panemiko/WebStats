interface ItemListProps {
  children: React.ReactNode
}

export function ItemList(props: ItemListProps) {
  const { children } = props

  return <ol className='mb-8 overflow-auto'>{children}</ol>
}
