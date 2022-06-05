import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
	const { isLoggedIn } = useSelector(store => store.users);

	return isLoggedIn ? children : <Navigate to='/login' />;
}
