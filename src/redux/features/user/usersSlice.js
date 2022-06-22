import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cleanCalendarState } from '../calendarSlice';
import { customFetch } from '../../../api/axios';
import { loginUserThunk } from './userThunk';

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

/*
const retrieveStoredToken = () => {
	const storedToken = localStorage.getItem('token');
	const storedExpirationDate = localStorage.getItem('expirationTime');

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
		duration: remainingTime
	};
};
*/

/*
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
*/

export const loginHandler = createAsyncThunk('users/loginHandler', loginUserThunk);

export const userRegister = createAsyncThunk('users/userRegister', async registerDetails => {
	try {
		const response = await customFetch.post('/users/new-user', registerDetails);
		const userDetails = response.data;

		return { ok: true, userDetails };
	} catch (error) {
		let errorMessage = 'Authentication failed';
		if (error.response.data.error) {
			errorMessage = error.response.data.error;
		}

		return { ok: false, error: errorMessage };
	}
});

export const renewToken = createAsyncThunk('users/renewToken', async () => {
	try {
		const response = await customFetch.get('users/renew-token');
		const body = response.data;
		localStorage.setItem('token', body.token);
		localStorage.setItem('expirationTime', body.expiresIn);

		return { ok: true, body };
	} catch (error) {
		let errorMessage = 'Authentication failed';
		if (error.response.data.error) {
			errorMessage = error.response.data.error;
		}

		return { ok: false, error: errorMessage };
	}
});

export const logoutHandler = createAsyncThunk(
	'users/logoutHandler',
	async (props, { dispatch, getState }) => {
		const state = getState();

		localStorage.removeItem('token');
		localStorage.removeItem('expirationTime');

		if (state.logoutTimer) {
			clearTimeout(state.logoutTimer);
		}

		dispatch(cleanCalendarState());
	}
);

// TODO: ADD AND ERROR STATE IF ANY API CALL FAILS AND SHOW A SNACKBAR
export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		logoutTimerHandler: (state, action) => {
			state.logoutTimer = action.payload;
		},
		// tokenDataHandler: (state, action) => {
		// 	const tokenData = action.payload;
		// 	// TODO: not sure if we need this tokenData state. check videos of max.
		// 	state.tokenData = tokenData;
		// 	if (tokenData) {
		// 		state.isLoggedIn = true;
		// 		state.userId = tokenData.userId;
		// 		state.username = tokenData.username;
		// 	} else {
		// 		state.isLoggedIn = false;
		// 		state.userId = null;
		// 		state.username = null;
		// 	}
		// },
		onCloseErrorSnackbar: (state, action) => {
			state.showErrorSnackbar = false;
		},
		onCloseSuccessSnackbar: (state, action) => {
			state.showSuccessSnackbar = false;
		}
	},
	//  TODO: change the way to handle actions like this(instead of builder):
	// [registerUser.pending]: state => {
	// 	state.isLoading = true;
	// },
	extraReducers: builder => {
		builder.addCase(loginHandler.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(loginHandler.rejected, (state, action) => {
			state.isLoading = false;
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
		builder.addCase(renewToken.pending, (state, action) => {
			state.CheckingAuth = true;
		});
		builder.addCase(renewToken.rejected, (state, action) => {
			state.CheckingAuth = false;
		});
		builder.addCase(renewToken.fulfilled, (state, action) => {
			state.CheckingAuth = false;
			if (action.payload.ok) {
				state.isLoggedIn = true;
				state.userId = action.payload.body.id;
				state.username = action.payload.body.username;
			} else {
				state.isLoggedIn = false;
				state.userId = null;
				state.username = null;
			}
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
