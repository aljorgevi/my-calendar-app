import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { fetchWithToken } from '../../helpers';

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
			const response = await fetchWithToken('login', loginDetails, 'POST');
			const body = response.data;
			console.log({ body });
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			return body;
		} catch (error) {
			// TODO: config axios to send the error message
			return error.response.data.error;
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
	}
});

export const { authenticate } = userSlice.actions;

export default userSlice.reducer;
