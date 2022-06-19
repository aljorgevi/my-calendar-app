import { useSelector, useDispatch } from 'react-redux';
import { logoutHandler } from '../../redux/features/user/usersSlice';

const Navbar = () => {
	const dispatch = useDispatch();
	const { username } = useSelector(store => store.users);

	const handleClick = () => dispatch(logoutHandler());

	return (
		<div className='navbar navbar-dark bg-dark mb-4'>
			<span className='navbar-brand'>{username}</span>

			<button className='btn btn-outline-danger' onClick={handleClick}>
				<i className='fas fa-sign'></i> Salir
			</button>
		</div>
	);
};

export default Navbar;
