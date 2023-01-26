import type { InputData } from 'lib/dialog'
import {
  addFormInput,
  resetDialog,
  setDialogDescription,
  setDialogTitle,
  setFormSecondarySubmitFunction,
  setFormSubmitAction,
  setFormSubmitFunction,
  setInputValue,
  setOpen,
  setSecondaryFormSubmitAction,
} from 'lib/dialog'
import { serializeFunction } from 'lib/store'
import { store } from 'lib/store'
import type { Socket } from 'socket.io-client'

export function useDialog() {
  return {
    async toggleDialog() {
      store.dispatch(setOpen({ open: !store.getState().dialog.open }))
    },
    async setDialogTitle(title: string) {
      store.dispatch(setDialogTitle({ title }))
    },
    async setDialogDescription(description: string) {
      store.dispatch(setDialogDescription({ description }))
    },
    async addFormInput(
      input: Omit<InputData, 'value'> & { defaultValue: string }
    ) {
      store.dispatch(
        addFormInput({
          input: { ...input, value: input.defaultValue },
        })
      )
    },
    async resetDialog() {
      store.dispatch(resetDialog())
    },
    async setFormSubmitAction(actionName: string) {
      store.dispatch(setFormSubmitAction({ actionName }))
    },
    async setFormSubmitFunction(
      onChange: (
        state: ReturnType<typeof store.getState>,
        socket: Socket
      ) => any
    ) {
      store.dispatch(
        setFormSubmitFunction({ onSubmit: serializeFunction(onChange) })
      )
    },
    async setInputValue(inputId: string, value: string) {
      store.dispatch(setInputValue({ inputId, value }))
    },
    async setFormSecondarySubmitFunction(
      onSecondaryChange: (
        state: ReturnType<typeof store.getState>,
        socket: Socket
      ) => any
    ) {
      store.dispatch(
        setFormSecondarySubmitFunction({
          onSecondarySubmit: serializeFunction(onSecondaryChange),
        })
      )
    },
    async setFormSecondarySubmitAction(actionName: string) {
      store.dispatch(setSecondaryFormSubmitAction({ actionName }))
    },
  }
}
