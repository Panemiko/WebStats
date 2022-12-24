export function CharacterAvatar(props) {
  const { src } = props

  return (
    <div
      style={{
        backgroundImage: `url('${src}')`,
      }}
      className='h-full w-full bg-top bg-cover rounded-2xl'
    ></div>
  )
}
