import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './features/uiSlice'
import calendarReducer from './features/calendarSlice'
import userSlice from './features/usersSlice'

export const store = configureStore({
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		}),
	reducer: {
		ui: uiReducer,
		calendar: calendarReducer,
		users: userSlice
	}
})
