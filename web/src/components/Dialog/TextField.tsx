type TextFieldProps = React.ComponentProps<'input'>

export function TextField(props: TextFieldProps) {
  return (
    <input
      {...props}
      className='px-5 py-3 bg-mauve3 rounded-xl placeholder:text-mauve11 text-violet12 mb-5 w-[stretch]'
    />
  )
}
