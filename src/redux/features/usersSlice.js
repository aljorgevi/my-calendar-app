import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

			if (response.status === 200) {
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('token-init-date', new Date().getTime());
				return response.data;
			}
		} catch (error) {
			console.error(error);
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
		builder.addCase(userLogin.fulfilled, (state, action) => {
			state.IsAuthenticated = true;
			state.userId = action.payload.id;
			state.userName = action.payload.userName;
		});
	}
});

export const { authenticate } = userSlice.actions;

export default userSlice.reducer;
