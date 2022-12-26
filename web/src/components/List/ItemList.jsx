export function ItemList(props) {
  const { children } = props

  return <ol className='mb-8 overflow-auto'>{children}</ol>
}
