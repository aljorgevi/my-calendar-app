import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { renewToken } from '../redux/features/usersSlice';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarApp from '../components/CalendarApp';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export default function AppRouter() {
	const dispatch = useDispatch();
	const { isCheckingRenew, isLoggedIn } = useSelector(store => store.users);

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
						<PublicRoute isAuthenticated={isLoggedIn}>
							<LoginScreen />
						</PublicRoute>
					}
				/>
				<Route
					exact
					path='/'
					element={
						<PrivateRoute isAuthenticated={isLoggedIn}>
							<CalendarApp />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
