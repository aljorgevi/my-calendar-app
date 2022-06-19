import { customFetch } from '../../api/axios';

describe('testing calendar api', () => {
	const loginDetails = {
		email: 'test@test.com',
		password: 'password'
	};

	test('axios should have config baseURL by default', () => {
		// Arrange
		const axiosbaseUrl = customFetch.defaults.baseURL;
		const envURL = process.env.REACT_APP_API_URL;

		// Assert
		expect(axiosbaseUrl).toBe(envURL);
	});

	test('axios should have token in header', async () => {
		// Arrange
		const mockTocken =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9-gkKcW5R-4_4Jz4F_0U6PQ2CKXOaS0f6l7-NpKD-1sVg';
		localStorage.setItem('token', mockTocken);

		// Act
		const res = await customFetch.get('/test', loginDetails);

		// Assert
		expect(res.config.headers['Authorization']).toBe(`Bearer ${mockTocken}`);
	});
});
