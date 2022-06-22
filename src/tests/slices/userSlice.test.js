import { userSlice, loginHandler, logoutHandler } from '../../redux/features/user/usersSlice';
import { testUserCredentials, userInitialState } from '../fixtures';
import { store } from '../../redux/store';

describe('should return initial state', () => {
	test('should return the initial state', () => {
		expect(userSlice.getInitialState()).toEqual(userInitialState);
	});

	test('should handle login successfully', async () => {
		// Arrange
		const result = await store.dispatch(loginHandler(testUserCredentials));
		const body = result.payload.body;
		const { username } = store.getState().users;

		// Assert
		expect(result.type).toContain('users/loginHandler');
		expect(body).toHaveProperty('token');
		expect(username).toEqual(testUserCredentials.username);
	});

	test('should handle logout successfully', async () => {
		// Arrange
		const result = await store.dispatch(logoutHandler());
		const { username, userId, isLoggedIn } = store.getState().users;

		// Assert
		expect(result.type).toContain('users/logoutHandler');
		expect(username).toBeNull();
		expect(userId).toBeNull();
		expect(isLoggedIn).toBe(false);
	});
});
