import { useDispatch } from 'react-redux';
import { onEventDelete } from '../../redux/features/calendarSlice';

const EventDeleteFab = () => {
	const dispatch = useDispatch();

	const handleClick = () => dispatch(onEventDelete());

	return (
		<button className='btn btn-danger fab-danger' onClick={handleClick}>
			<i className='fas fa-trash'></i>
			<span>Borrar Evento</span>
		</button>
	);
};

export default EventDeleteFab;
