import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ActionButton } from 'components/ActionButton'
import { TextField } from 'components/Dialog/TextField'
import { useDialog } from 'hooks/useDialog'
import { useStoreUpdate } from 'hooks/useStoreUpdate'
import { socket } from 'lib/socket'
import { deserializeFunction, store } from 'lib/store'
import { useCallback } from 'react'

export function Dialog() {
  const { dialog } = useStoreUpdate()
  const { toggleDialog, setInputValue } = useDialog()

  const handleSubmit = useCallback(() => {
    toggleDialog()
    deserializeFunction(dialog.content.onSubmit)(store.getState(), socket)
  }, [dialog])

  const handleSecondarySubmit = useCallback(() => {
    toggleDialog()
    deserializeFunction(dialog.content.onSecondarySubmit)(
      store.getState(),
      socket
    )
  }, [dialog])

  return (
    <DialogPrimitive.Root open={dialog.open} onOpenChange={toggleDialog}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className='bg-violet12 fixed inset-0 opacity-20' />
        <div className='fixed inset-0 flex justify-center px-6 py-8'>
          <DialogPrimitive.Content className='bg-slate2 z-10 rounded-lg text-slate11 py-12 px-5 w-[stretch] h-fit outline-none'>
            <div className='mb-10'>
              <DialogPrimitive.Title className='text-violet12 font-bold text-2xl capitalize'>
                {dialog.title}
              </DialogPrimitive.Title>
              {dialog.description && (
                <DialogPrimitive.Description className='text-lg mb-6 break-words'>
                  {dialog.description}
                </DialogPrimitive.Description>
              )}
            </div>
            <div
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit()
                }
              }}
            >
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
              <div className='flex gap-3'>
                {dialog.content.secondarySubmitAction && (
                  <ActionButton
                    variant='secondary'
                    onClick={handleSecondarySubmit}
                  >
                    {dialog.content.secondarySubmitAction}
                  </ActionButton>
                )}
                <ActionButton onClick={handleSubmit}>
                  {dialog.content.submitAction}
                </ActionButton>
              </div>
            </div>
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
