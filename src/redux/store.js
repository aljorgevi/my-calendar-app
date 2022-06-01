import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './features/uiSlice'

export const store = configureStore({
	reducer: {
		ui: uiReducer
	}
})
