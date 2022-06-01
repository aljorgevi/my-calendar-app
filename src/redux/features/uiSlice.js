import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
/*
import { types } from '../types/types'

const initialState = {
  modalOpen: false
}

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true
      }
    default:
      return state
  }
}
*/

const initialState = {
	modalOpen: false
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openModal: state => {
			state.modalOpen = true
		}
	}
})

export const { openModal } = uiSlice.actions

export default uiSlice.reducer
