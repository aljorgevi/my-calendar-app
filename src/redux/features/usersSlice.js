import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithToken } from '../../helpers';

const initialState = {
	IsAuthenticated: false
};

/* endpoint, data, method = 'GET' */
export const userLogin = createAsyncThunk(
	'users/userLogin',
	async loginDetails => {
		const response = await fetchWithToken('login', loginDetails, 'POST');
		console.log({ response });
		return response;
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
			console.log({ state, action });
			state.IsAuthenticated = true;
		});
	}
});

export const { authenticate } = userSlice.actions;

export default userSlice.reducer;
