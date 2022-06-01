import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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
