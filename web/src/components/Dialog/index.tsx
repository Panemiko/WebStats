import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ActionButton } from 'components/ActionButton'
import { TextField } from 'components/Dialog/TextField'
import { useDialog } from 'hooks/useDialog'
import { useStoreUpdate } from 'hooks/useStoreUpdate'
import { getSocket } from 'lib/socket'
import { deserializeFunction, store } from 'lib/store'

export function Dialog() {
  const { dialog } = useStoreUpdate()
  const { toggleDialog, setInputValue } = useDialog()

  return (
    <DialogPrimitive.Root open={dialog.open} onOpenChange={toggleDialog}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className='bg-violet12 fixed inset-0 opacity-20' />
        <div className='fixed inset-0 flex items-center justify-center'>
          <DialogPrimitive.Content className='bg-slate2 z-10 rounded-lg text-slate11 py-8 px-5 mx-6 w-[stretch] outline-none min-h-[40vh]'>
            <div className='mb-10'>
              <DialogPrimitive.Title className='text-violet12 font-bold text-3xl capitalize'>
                {dialog.title}
              </DialogPrimitive.Title>
              {dialog.description && (
                <DialogPrimitive.Description className='text-lg mb-6 break-words'>
                  {dialog.description}
                </DialogPrimitive.Description>
              )}
            </div>
            <div>
              {dialog.content.inputs.map((input, index) => (
                <label key={index} htmlFor={input.id}>
                  {input.label}
                  <TextField
                    {...input}
                    defaultValue={undefined}
                    value={input.value}
                    onChange={(e) => {
                      setInputValue(input.id, e.target.value)
                    }}
                  />
                </label>
              ))}
              <ActionButton
                onClick={() => {
                  toggleDialog()
                  deserializeFunction(dialog.content.onSubmit)(
                    store.getState(),
                    getSocket()
                  )
                }}
              >
                {dialog.content.submitAction}
              </ActionButton>
            </div>
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
