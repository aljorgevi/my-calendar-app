import { renderHook } from '@testing-library/react';
import { useForm } from '../../hooks/useForm';

describe('tesing useForm Hook', () => {
	const initialForm = {
		login_email: 'test@test.com',
		login_password: 'password'
	};

	it('should render correctly', () => {
		const { result } = renderHook(() => useForm(initialForm));
		console.log(result.current);

		expect(result.current).toEqual([
			{ login_email: 'test@test.com', login_password: 'password' },
			expect.any(Function),
			expect.any(Function)
		]);
	});
});
