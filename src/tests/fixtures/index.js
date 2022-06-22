export const userInitialState = {
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

export const authenticatedState = {
	status: 'authenticated',
	user: {
		uid: 'abc',
		name: 'Fernando'
	},
	errorMessage: undefined
};

export const notAuthenticatedState = {
	status: 'not-authenticated',
	user: {},
	errorMessage: undefined
};

/* user */
export const testUserCredentials = {
	email: 'test@test.com',
	password: 'password',
	username: 'test'
};
