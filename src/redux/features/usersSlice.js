import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { fetchWithoutToken } from '../../helpers';

const initialState = {
	IsAuthenticated: false,
	userId: null,
	userName: null,
	showSuccessSnackbar: false,
	showErrorSnackbar: false,
	errorMessage: null
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
			return body;
		} catch (error) {
			let errorMessage = 'Authentication failed';
			if (error.response.data.error) {
				errorMessage = error.response.data.error;
			}

			// return Swal.fire({
			// 	title: 'Error',
			// 	text: errorMessage,
			// 	icon: 'error'
			// });
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

			return { error: false, userDetails };
		} catch (error) {
			let errorMessage = 'Authentication failed';
			if (error.response.data.error) {
				errorMessage = error.response.data.error;
			}

			return { error: true, errorMessage };
		}
	}
);

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
		}
	},
	extraReducers: builder => {
		builder.addCase(loginHandler.pending, (state, action) => {
			console.log('pending');
			console.log({ action });
		});
		builder.addCase(loginHandler.fulfilled, (state, action) => {
			state.IsAuthenticated = true;
			state.userId = action.payload.id;
			state.userName = action.payload.userName;
		});
		builder.addCase(loginHandler.rejected, (state, action) => {
			console.log('rejected');
			console.log({ action });
		});
		builder.addCase(userRegister.pending, (state, action) => {
			console.log('pending');
			console.log({ action });
		});
		builder.addCase(userRegister.rejected, (state, action) => {
			console.log('rejected');
			console.log({ action });
		});
		builder.addCase(userRegister.fulfilled, (state, action) => {
			if (action.payload.error) {
				state.showErrorSnackbar = true;
				state.errorMessage = action.payload.errorMessage;
			}
		});
	}
});

export const { authenticate, onCloseErrorSnackbar } = userSlice.actions;

export default userSlice.reducer;
