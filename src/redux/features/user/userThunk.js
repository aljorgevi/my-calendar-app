import { customFetch } from '../../../api/axios';
import { calculateRemainingTime } from '../../../helpers';
import { logoutTimerHandler } from './usersSlice';

export const loginUserThunk = async (loginDetails, thunkAPI) => {
	try {
		const response = await customFetch.post('/login', loginDetails);
		const body = response.data;

		let expirationTime = new Date(new Date().getTime() + body.expiresIn);
		expirationTime.toISOString();

		localStorage.setItem('token', body.token);
		localStorage.setItem('expirationTime', expirationTime);

		const remainingTime = calculateRemainingTime(expirationTime);

		// setTimeout return a reference we save it in logoutTimer
		const logoutTimer = setTimeout(() => {
			localStorage.removeItem('token');
			localStorage.removeItem('token-init-date');
		}, remainingTime);

		await thunkAPI.dispatch(logoutTimerHandler(logoutTimer));
		return { ok: true, body };
	} catch (error) {
		let errorMessage = 'Authentication failed';
		if (error.response.data.error) {
			errorMessage = error.response.data.error;
		}
		return { ok: false, error: errorMessage };
	}
};
