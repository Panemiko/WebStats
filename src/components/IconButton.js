export function IconButton(props) {
  const { Icon } = props

  return (
    <button className='p-4 bg-violet9 rounded-2xl h-20 w-20 hover:bg-violet10'>
      <Icon className='fill-violet12 h-12 w-12' />
    </button>
  )
}
