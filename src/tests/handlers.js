import { rest } from 'msw';

export const handlers = [
	rest.get('http://localhost:3001/api/v1/test', (req, res, ctx) => {
		return res(ctx.json({ token: 'mocked_user_token' }));
	})
];
