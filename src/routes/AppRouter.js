import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { renewToken } from '../redux/features/usersSlice';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function AppRouter() {
	const dispatch = useDispatch();
	const { CheckingAuth } = useSelector(store => store.users);

	useEffect(() => {
		console.log('render');
		dispatch(renewToken());
	}, [dispatch]);

	if (CheckingAuth) {
		return (
			<div className='display-center'>
				<Box sx={{ display: 'flex' }}>
					<CircularProgress />
				</Box>
			</div>
		);
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
