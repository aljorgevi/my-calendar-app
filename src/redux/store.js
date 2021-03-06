import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './features/ui/uiSlice';
import calendarReducer from './features/calendarSlice';
import userSlice from './features/user/usersSlice';

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
});
