import { render, screen } from '@testing-library/react';
import EventDeleteFab from '../../components/ui/EventDeleteFab';

describe('test in <FabDelete />', () => {
	test('should render correctly', () => {
		render(<EventDeleteFab />);
	});
});
