import { createSlice } from '@reduxjs/toolkit'

export interface InputData {
  id: string
  name: string
  value: any
  placeholder: any
  type: string
  label: string
}

export interface Content {
  onSubmit: string
  onSecondarySubmit: string
  secondarySubmitAction: string
  submitAction: string
  inputs: InputData[]
}

export interface DialogMeta {
  open: boolean
  title: string
  description?: string
  content: Content
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    open: false,
    title: '',
    description: '',
    content: {
      inputs: [],
      onSubmit: '',
      submitAction: '',
      onSecondarySubmit: '',
      secondarySubmitAction: '',
    },
  } as DialogMeta,
  reducers: {
    setOpen(state, action: { payload: { open: boolean } }) {
      return {
        ...state,
        open: action.payload.open,
      }
    },
    setDialogTitle(state, action: { payload: { title: string } }) {
      return {
        ...state,
        title: action.payload.title,
      }
    },
    setDialogDescription(state, action: { payload: { description: string } }) {
      return {
        ...state,
        description: action.payload.description,
      }
    },
    setFormSubmitFunction(state, action: { payload: { onSubmit: string } }) {
      return {
        ...state,
        content: {
          ...state.content,
          onSubmit: action.payload.onSubmit,
        },
      }
    },
    setFormSecondarySubmitFunction(
      state,
      action: { payload: { onSecondarySubmit: string } }
    ) {
      return {
        ...state,
        content: {
          ...state.content,
          onSecondarySubmit: action.payload.onSecondarySubmit,
        },
      }
    },

    setFormSubmitAction(state, action: { payload: { actionName: string } }) {
      return {
        ...state,
        content: {
          ...state.content,
          submitAction: action.payload.actionName,
        },
      }
    },
    setSecondaryFormSubmitAction(
      state,
      action: { payload: { actionName: string } }
    ) {
      return {
        ...state,
        content: {
          ...state.content,
          secondarySubmitAction: action.payload.actionName,
        },
      }
    },
    addFormInput(state, action: { payload: { input: InputData } }) {
      state.content.inputs?.push(action.payload.input)
    },
    setInputValue(
      state,
      action: { payload: { inputId: string; value: string } }
    ) {
      state.content.inputs.forEach((input, index) => {
        if (input.id === action.payload.inputId) {
          state.content.inputs[index].value = action.payload.value
        }
      })
    },
    resetDialog() {
      return {
        open: false,
        title: '',
        description: '',
        content: {
          inputs: [],
          onSubmit: '',
          submitAction: '',
          onSecondarySubmit: '',
          secondarySubmitAction: '',
        },
      }
    },
  },
})

export const {
  resetDialog,
  setDialogDescription,
  setDialogTitle,
  setOpen,
  addFormInput,
  setFormSubmitAction,
  setFormSubmitFunction,
  setInputValue,
  setFormSecondarySubmitFunction,
  setSecondaryFormSubmitAction,
} = dialogSlice.actions
