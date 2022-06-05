import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { renewToken } from './redux/features/usersSlice';
import LoginScreen from './components/auth/LoginScreen';
import CalendarApp from './components/CalendarApp';
import MaterialUiApp from './MaterialUiApp';

export default function App() {
	const dispatch = useDispatch();
	const { isCheckingRenew } = useSelector(store => store.users);

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
				<Route exact path='/login' element={<LoginScreen />} />
				<Route exact path='/' element={<CalendarApp />} />
				<Route path='/material' element={<MaterialUiApp />} />
			</Routes>
		</BrowserRouter>
	);
}
