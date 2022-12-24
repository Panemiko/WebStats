export function Item(props) {
  const { children, name } = props

  return (
    <li
      className={`bg-violet3 hover:bg-violet4 active:bg-violet5 mb-1 px-8 py-3 flex items-center ${
        children ? 'justify-between' : 'justify-start'
      }`}
    >
      <span className='text-violet12 text-lg capitalize'>{name}</span>
      {children}
    </li>
  )
}
