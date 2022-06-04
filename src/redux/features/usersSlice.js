import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { fetchWithoutToken } from '../../helpers';

const initialState = {
	IsAuthenticated: false,
	userId: null,
	userName: null
};

/* endpoint, data, method = 'GET' */
//  TODO: add validation if error
export const userLogin = createAsyncThunk(
	'users/userLogin',
	async loginDetails => {
		try {
			const response = await fetchWithoutToken('login', loginDetails, 'POST');
			const body = response.data;
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			return body;
		} catch (error) {
			// TODO: config axios to send the error message
			return Swal.fire({
				title: 'Error',
				text: error.response.data.error,
				icon: 'error'
			});
		}
	}
);

export const userRegister = createAsyncThunk(
	'users/userRegister',
	async registerDetails => {
		try {
			console.log('inside try');
			const response = await fetchWithoutToken(
				'users/new-user',
				registerDetails,
				'POST'
			);

			return response.data;
		} catch (error) {
			return Swal.fire({
				title: 'Error',
				text: error.response.data.error,
				icon: 'error'
			});
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
		UserLogout: (state, action) => {}
	},
	extraReducers: builder => {
		builder.addCase(userLogin.pending, (state, action) => {
			console.log('pending');
			console.log({ action });
		});
		builder.addCase(userLogin.fulfilled, (state, action) => {
			state.IsAuthenticated = true;
			state.userId = action.payload.id;
			state.userName = action.payload.userName;
		});
		builder.addCase(userLogin.rejected, (state, action) => {
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
			// TODO: this mean the request finished, not necessarily it was success
			console.log('fulfilled');
			const userReturned = action.payload;
		});
	}
});

export const { authenticate } = userSlice.actions;

export default userSlice.reducer;
