export function ActionButton(props) {
  const { children, onClick } = props

  return (
    <button
      className='bg-violet9 hover:bg-violet10 active:bg-violet10 font-semibold mx-5 text-violet12 text-xl rounded-md py-3 w-[stretch]'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
