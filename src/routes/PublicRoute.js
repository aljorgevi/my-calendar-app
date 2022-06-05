import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children, isAuthenticated }) {
	return isAuthenticated ? <Navigate to='/' /> : children;
}
