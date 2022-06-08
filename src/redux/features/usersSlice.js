import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { fetchWithoutToken, fetchWithToken } from '../../helpers';

const initialState = {
	tokenData: null,
	logoutTimer: null,
	isCheckingRenew: true,
	isLoading: false,
	isLoggedIn: false,
	userId: null,
	username: null,
	showSuccessSnackbar: false,
	showErrorSnackbar: false,
	errorMessage: null,
	successMessage: null,
	CheckingAuth: true
};

const calculateRemainingTime = expirationTime => {
	const currenTime = new Date().getTime();
	const adjExpirationTime = new Date(expirationTime).getTime();

	const remainingTime = adjExpirationTime - currenTime;

	return remainingTime;
};

const retrieveStoredToken = () => {
	const storedToken = localStorage.getItem('token');
	const storedExpirationDate = localStorage.getItem('expirationTime');
	// FIXME: This is a temporary, if we have a big app we may need to call the api to get user info every time...
	const storedUserId = localStorage.getItem('userId');
	const storedUsername = localStorage.getItem('username');

	const remainingTime = calculateRemainingTime(storedExpirationDate);
	console.log({ storedToken });

	// one minute
	// TODO: if less than 2 hours, maybe call the renew token api... and the token comes with a remining time like 1 month from the api
	if (!storedToken || remainingTime <= 60000) {
		localStorage.removeItem('token');
		localStorage.removeItem('expirationTime');
		return null;
	}

	return {
		token: storedToken,
		duration: remainingTime,
		userId: storedUserId,
		username: storedUsername
	};
};

export const checkForTokenData = createAsyncThunk(
	'users/checkForTokenData',
	async (props, { dispatch }) => {
		const tokenData = retrieveStoredToken();

		if (tokenData) {
			console.log(tokenData.duration);
			const logoutTimer = setTimeout(logoutHandler, tokenData.duration);
			dispatch(logoutTimerHandler(logoutTimer));
		}

		dispatch(tokenDataHandler(tokenData));
	}
);

export const loginHandler = createAsyncThunk(
	'users/loginHandler',
	async (loginDetails, { dispatch }) => {
		try {
			const response = await fetchWithoutToken('login', loginDetails, 'POST');
			const body = response.data;

			let expirationTime = new Date(new Date().getTime() + body.expiresIn);
			expirationTime.toISOString();

			localStorage.setItem('token', body.token);
			localStorage.setItem('expirationTime', expirationTime);
			// FIXME: in a real app, probably will need to call the renew token api every refresh as we may need more information about the user.
			// if for example we have a profile or settings section, etc.
			localStorage.setItem('userId', body.id);
			localStorage.setItem('username', body.username);

			const remainingTime = calculateRemainingTime(expirationTime);

			// setTimeout return a reference we save it in logoutTimer
			const logoutTimer = setTimeout(() => {
				localStorage.removeItem('token');
				localStorage.removeItem('token-init-date');
			}, remainingTime);

			await dispatch(logoutTimerHandler(logoutTimer));
			return { ok: true, body };
		} catch (error) {
			let errorMessage = 'Authentication failed';
			if (error.response.data.error) {
				errorMessage = error.response.data.error;
			}
			return { ok: false, error: errorMessage };
		}
	}
);

export const userRegister = createAsyncThunk(
	'users/userRegister',
	async registerDetails => {
		try {
			const response = await fetchWithoutToken(
				'users/new-user',
				registerDetails,
				'POST'
			);
			const userDetails = response.data;

			return { ok: true, userDetails };
		} catch (error) {
			let errorMessage = 'Authentication failed';
			if (error.response.data.error) {
				errorMessage = error.response.data.error;
			}

			return { ok: false, error: errorMessage };
		}
	}
);

// export const renewToken = createAsyncThunk('users/renewToken', async () => {
// 	try {
// 		const response = await fetchWithToken('users/renew-token');
// 		const body = response.data;
// 		localStorage.setItem('token', body.token);
// 		// TODO: maybe change the name of the key
// 		// localStorage.setItem('expirationTime', body.expiresIn);
// 		return { ok: true, body };
// 	} catch (error) {
// 		let errorMessage = 'Authentication failed';
// 		if (error.response.data.error) {
// 			errorMessage = error.response.data.error;
// 		}

// 		return { ok: false, error: errorMessage };
// 	}
// });

export const logoutHandler = createAsyncThunk(
	'users/logoutHandler',
	async (props, { getState }) => {
		const state = getState();

		localStorage.removeItem('token');
		localStorage.removeItem('expirationTime');

		if (state.logoutTimer) {
			clearTimeout(state.logoutTimer);
		}
	}
);

/*
useEffect(() => {
	const unsubscribe = auth.onAuthStateChanged((user) => {
		setCurrentUser(user);
		setLoading(false);
	});

	return unsubscribe;
}, []);
*/

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		logoutTimerHandler: (state, action) => {
			state.logoutTimer = action.payload;
		},
		tokenDataHandler: (state, action) => {
			const tokenData = action.payload;
			// TODO: not sure if we need this tokenData state. check videos of max.
			state.tokenData = tokenData;
			if (tokenData) {
				state.isLoggedIn = true;
				state.userId = tokenData.userId;
				state.username = tokenData.username;
			} else {
				state.isLoggedIn = false;
				state.userId = null;
				state.username = null;
			}
		},
		UserStarted: (state, action) => {},
		UserRegister: (state, action) => {},
		needToRenew: (state, action) => {},
		onCloseErrorSnackbar: (state, action) => {
			state.showErrorSnackbar = false;
		},
		onCloseSuccessSnackbar: (state, action) => {
			state.showSuccessSnackbar = false;
		}
	},
	extraReducers: builder => {
		builder.addCase(loginHandler.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(loginHandler.fulfilled, (state, action) => {
			const result = action.payload;

			if (!result.ok) {
				state.errorMessage = result.error;
				state.showErrorSnackbar = true;
				return;
			}

			state.isLoading = false;
			state.isLoggedIn = true;
			state.userId = result.body.id;
			state.username = result.body.username;
		});
		builder.addCase(loginHandler.rejected, (state, action) => {
			state.isLoading = false;
		});
		builder.addCase(userRegister.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(userRegister.rejected, (state, action) => {
			state.isLoading = false;
		});
		builder.addCase(userRegister.fulfilled, (state, action) => {
			const result = action.payload;

			if (!result.ok) {
				state.showErrorSnackbar = true;
				state.errorMessage = action.payload.error;
				return;
			}

			state.isLoading = false;
			state.showSuccessSnackbar = true;
			state.successMessage = 'User created successfully';
		});
		builder.addCase(logoutHandler.fulfilled, (state, action) => {
			state.isLoggedIn = false;
			state.userId = null;
			state.username = null;
		});
		builder.addCase(checkForTokenData.pending, (state, action) => {
			state.CheckingAuth = true;
		});
		builder.addCase(checkForTokenData.fulfilled, (state, action) => {
			state.CheckingAuth = false;
		});
	}
});

export const {
	authenticate,
	onCloseErrorSnackbar,
	onCloseSuccessSnackbar,
	onLogout,
	logoutTimerHandler,
	tokenDataHandler
} = userSlice.actions;

export default userSlice.reducer;
