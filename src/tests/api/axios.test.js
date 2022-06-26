import { customFetch } from '../../api/axios';
import { rest } from 'msw';
import { server } from '../server';

describe('testing calendar api', () => {
	const loginDetails = {
		email: 'test@test.com',
		password: 'password'
	};

	// TODO: set this in a config global file.
	// TODO: I can see my request, tokens, and body that i send... the response is different.
	// TODO: try differents response for same call. https://github.com/mswjs/msw/discussions/885
	// TODO: MINUTE 11:57 https://www.youtube.com/watch?v=oMv2eAGWtZU&list=PLZeub04vFhEoc9CyIKhLGxCl8Vwd0BnkA&index=2&t=778s
	// have handlers, even do I prfer to have the interceptor in the test file.

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
		// this in intersectec in handlers.js
		const res = await customFetch.get('/test', loginDetails);
		// console.log({ res });

		// Assert
		expect(res.config.headers['Authorization']).toBe(`Bearer ${mockTocken}`);
	});

	test('same request the previous but failed', async () => {
		// Arrange
		const mockTocken =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9-gkKcW5R-4_4Jz4F_0U6PQ2CKXOaS0f6l7-NpKD-1sVg';
		localStorage.setItem('token', mockTocken);

		server.use(
			rest.get('http://localhost:3001/api/v1/test', (req, res, ctx) =>
				res(ctx.json({ token: 'mocked_user_token' }))
			)
		);

		// Act
		const res = await customFetch.get('/test', loginDetails);
		console.log({ res });

		// Assert
		expect(res.data.token).toBe('mocked_user_token');
	});
});
