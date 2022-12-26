export function ItemInfo(props) {
  const { children, variation } = props

  return (
    <span
      className={`${
        variation === 2
          ? 'font-light text-lg text-violet10 pr-2 border-r-2 border-violet6'
          : 'text-xl text-violet11'
      }`}
    >
      {children}
    </span>
  )
}
