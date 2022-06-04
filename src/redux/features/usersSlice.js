import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
	IsAuthenticated: false
}

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
    checkingUser: (state, action) => {},
    UserFinished: (state, action) => {},
    UserStarted: (state, action) => {},
    UserLogin: (state, action) => {},
    UserRegister: (state, action) => {},
    UserRenew: (state, action) => {},
    UserLogout: (state, action) => {},
  }
})

export const {  authenticate} = userSlice.actions

export default userSlice.reducer
