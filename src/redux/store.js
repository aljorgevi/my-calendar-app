import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './features/uiSlice'
import calendarReducer from './features/calendarSlice'

export const store = configureStore({
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		}),
	reducer: {
		ui: uiReducer,
		calendar: calendarReducer
	}
})
