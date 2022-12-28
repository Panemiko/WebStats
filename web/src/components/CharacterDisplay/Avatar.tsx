interface AvatarProps {
  src: string
}

export function Avatar(props: AvatarProps) {
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
