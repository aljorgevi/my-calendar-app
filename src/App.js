import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppRouter from './routes/AppRouter';

export default function CalendarApp() {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
}
