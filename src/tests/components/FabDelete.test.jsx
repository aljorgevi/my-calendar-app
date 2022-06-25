import { render, screen } from '../utils/test-utils';
import EventDeleteFab from '../../components/ui/EventDeleteFab';

describe('test in <FabDelete />', () => {
	test('should render correctly', () => {
		render(<EventDeleteFab />);

		expect(screen.getByText(/borrar evento/i)).toBeInTheDocument();
	});
});
