import { customFetch } from '../../api/axios';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

describe('testing calendar api', () => {
	const loginDetails = {
		email: 'test@test.com',
		password: 'password'
	};

	// TODO: set this in a config global file.
	// TODO: I can see my request, tokens, and body that i send... the response is different.
	// TODO: try differents response for same call. https://github.com/mswjs/msw/discussions/885
	const server = setupServer(
		rest.get('http://localhost:3001/api/v1/test', (req, res, ctx) => {
			// Respond with a mocked user token that gets persisted
			// in the `sessionStorage` by the `Login` component.
			return res(ctx.json({ token: 'mocked_user_token' }));
		})
	);

	// Enable API mocking before tests.
	beforeAll(() => server.listen());

	// Reset any runtime request handlers we may add during the tests.
	afterEach(() => server.resetHandlers());

	// Disable API mocking after the tests are done.
	afterAll(() => server.close());

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
		console.log({ res });

		// Assert
		expect(res.config.headers['Authorization']).toBe(`Bearer ${mockTocken}`);
	});
});
