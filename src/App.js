import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { renewToken } from './redux/features/usersSlice';
import LoginScreen from './components/auth/LoginScreen';
import CalendarApp from './components/CalendarApp';
import MaterialUiApp from './MaterialUiApp';

export default function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(renewToken());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Routes>
				<Route exact path='/login' element={<LoginScreen />} />
				<Route exact path='/' element={<CalendarApp />} />
				<Route path='/material' element={<MaterialUiApp />} />
			</Routes>
		</BrowserRouter>
	);
}
