import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/features/ui/uiSlice';

const AddNewFab = () => {
	const dispatch = useDispatch();

	const handleClick = () => dispatch(openModal());

	return (
		<button onClick={handleClick} className='btn btn-primary fab'>
			<i className='fas fa-plus'></i>
		</button>
	);
};

export default AddNewFab;
