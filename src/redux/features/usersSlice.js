import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithoutToken, fetchWithToken } from '../../helpers';

const initialState = {
	isCheckingRenew: true,
	isLoading: false,
	isLoggedIn: false,
	userId: null,
	username: null,
	showSuccessSnackbar: false,
	showErrorSnackbar: false,
	errorMessage: null,
	successMessage: null
};

/* endpoint, data, method = 'GET' */
//  TODO: add validation if error
// TODO: handle the expiresIn
export const loginHandler = createAsyncThunk(
	'users/loginHandler',
	async loginDetails => {
		try {
			const response = await fetchWithoutToken('login', loginDetails, 'POST');
			const body = response.data;
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime());

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

export const renewToken = createAsyncThunk('users/renewToken', async () => {
	try {
		const response = await fetchWithToken('users/renew-token');
		const body = response.data;
		localStorage.setItem('token', body.token);
		// TODO: maybe change the name of the key
		localStorage.setItem('token-init-date', new Date().getTime());
		return { ok: true, body };
	} catch (error) {
		let errorMessage = 'Authentication failed';
		if (error.response.data.error) {
			errorMessage = error.response.data.error;
		}

		return { ok: false, error: errorMessage };
	}
});

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		checkingUser: (state, action) => {},
		UserFinished: (state, action) => {},
		UserStarted: (state, action) => {},
		UserRegister: (state, action) => {},
		UserRenew: (state, action) => {},
		UserLogout: (state, action) => {},
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
			// TODO: we will re-firect the user after being login to the home page, so we need to remove this later
			state.showSuccessSnackbar = true;
			state.successMessage = 'User created successfully';
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
		builder.addCase(renewToken.pending, (state, action) => {
			state.isCheckingRenew = true;
		});
		builder.addCase(renewToken.rejected, (state, action) => {
			state.isCheckingRenew = false;
		});
		builder.addCase(renewToken.fulfilled, (state, action) => {
			const result = action.payload;

			if (!result.ok) {
				state.isCheckingRenew = false;
				state.isLoggedIn = false;
				return;
			}

			state.isCheckingRenew = false;
			state.isLoggedIn = true;
			state.userId = result.body.id;
			state.username = result.body.username;
		});
	}
});

export const { authenticate, onCloseErrorSnackbar, onCloseSuccessSnackbar } =
	userSlice.actions;

export default userSlice.reducer;
