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

/* calendar */

export const events = [
	{
		id: '1',
		start: new Date('2022-10-21 13:00:00'),
		end: new Date('2022-10-21 15:00:00'),
		title: 'birthday party',
		notes: 'this is a birthday party'
	},
	{
		id: '2',
		start: new Date('2022-11-09 13:00:00'),
		end: new Date('2022-11-09 15:00:00'),
		title: 'wedding anniversary',
		notes: 'buy a wedding anniversary gift'
	}
];

export const calendarInitialState = {
	events: [],
	activeEvents: null
};

export const calendarWithEventsState = {
	events: [...events],
	activeEvent: null
};

export const calendarWithActiveEventState = {
	events: [...events],
	activeEvent: { ...events[0] }
};
