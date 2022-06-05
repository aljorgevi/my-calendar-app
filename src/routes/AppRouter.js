import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { renewToken } from '../redux/features/usersSlice';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export default function AppRouter() {
	const dispatch = useDispatch();
	const { isCheckingRenew } = useSelector(store => store.users);

	// TODO: instead for checking for renew all the time, we can do it wonly when is about to expire
	useEffect(() => {
		dispatch(renewToken());
	}, [dispatch]);

	if (isCheckingRenew) {
		// TODO: create a loading in the middle of the screen
		return <div>Checking token...</div>;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route
					exact
					path='/login'
					element={
						<PublicRoute>
							<LoginScreen />
						</PublicRoute>
					}
				/>
				<Route
					exact
					path='/'
					element={
						<PrivateRoute>
							<CalendarScreen />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
