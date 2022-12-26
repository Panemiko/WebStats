export function SubTitle(props) {
  const { children, color } = props

  return (
    <h2
      className={`${
        color === 'error' ? 'text-tomato11' : 'text-violet10'
      } font-medium text-xl block`}
    >
      {children}
    </h2>
  )
}
