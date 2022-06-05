import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
	const { isLoggedIn } = useSelector(store => store.users);

	return isLoggedIn ? <Navigate to='/' /> : children;
}
