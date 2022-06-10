import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import {
	fetchWithoutToken,
	fetchWithToken,
	desirializeEvents
} from '../../helpers';

const initialState = {
	events: [],
	activeEvents: null
};

/*
	{
			id: new Date().getTime(),
			title: 'All Day Event',
			start: moment().toDate(),
			end: moment().add(2, 'hours').toDate(),
			bgColor: '#f56954',
			user: {
				_id: '123',
				name: 'John Doe'
			}
		}
*/

export const startLoadingEvents = createAsyncThunk(
	'calendar/startLoadingEvents',
	async (props, { dispatch }) => {
		try {
			const response = await fetchWithToken('events');
			const body = response.data;
			const events = desirializeEvents(body);

			return { ok: true, events };
		} catch (error) {
			let errorMessage = 'Authentication failed';
			if (error.response.data.error) {
				errorMessage = error.response.data.error;
			}

			return { ok: false, error: errorMessage };
		}
	}
);

export const onAddNewEvent = createAsyncThunk(
	'calendar/onAddNewEvent',
	async (event, { dispatch, getState }) => {
		// getState().calendar.events.push(event);
		const { username, userId } = getState().users;

		try {
			const response = await fetchWithToken('events', event, 'POST');
			const body = response.data;

			const eventToBeDisplayed = {
				id: body.id,
				title: body.title,
				start: body.start,
				end: body.end,
				bgColor: '#f56954',
				user: {
					_id: userId,
					username
				}
			};

			return { ok: true, eventToBeDisplayed };
		} catch (error) {
			// TODO: MAYBE CREATE A SLICE FOR ERROR HANDLE AS I CAN GET AN DISPATCH FUNCTION WITH CREATE ASYN THUNK..
			let errorMessage = 'Authentication failed';
			if (error.response.data.error) {
				errorMessage = error.response.data.error;
			}

			return { ok: false, error: errorMessage };
		}
	}
);

export const onEventUpdate = createAsyncThunk(
	'calendar/onEventUpdate',
	async (event, { dispatch, getState }) => {
		const { id } = event;
		const { username, userId } = getState().users;

		try {
			const response = await fetchWithToken(`events/${id}`, event, 'PUT');
			const body = response.data;

			const eventToBeDisplayed = {
				id: body.id,
				title: body.title,
				start: body.start,
				end: body.end,
				bgColor: '#f56954',
				user: {
					_id: userId,
					username
				}
			};

			return { ok: true, body: eventToBeDisplayed };
		} catch (error) {
			let errorMessage = 'Authentication failed';
			if (error.response.data.error) {
				errorMessage = error.response.data.error;
			}

			return { ok: false, error: errorMessage };
		}
	}
);

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		// addEvent: (state, action) => {
		// 	const event = action.payload;
		// 	// Redux Toolkit's createReducer and createSlice automatically use Immer internally to let you write simpler immutable update logic using "mutating" syntax.
		// 	// This helps simplify most reducer implementations.
		// 	// https://redux-toolkit.js.org/usage/immer-reducers
		// 	state.events.push(event);
		// },
		setActiveEvent: (state, action) => {
			state.activeEvents = action.payload;
		},
		clearActiveEvent: state => {
			state.activeEvents = null;
		},
		eventUpdated: (state, action) => {
			const id = action.payload.id;
			state.events = state.events.map(event => {
				if (event.id === id) {
					return action.payload;
				}
				return event;
			});
		},
		eventDeleted: state => {
			state.events = state.events.filter(
				event => event.id !== state.activeEvents.id
			);
			state.activeEvents = null;
		},
		loadEvents: (state, action) => {
			const result = action.payload;
			if (result.ok) {
			} else {
			}
		}
	},
	extraReducers: {
		[onAddNewEvent.fulfilled]: (state, action) => {
			const result = action.payload;
			if (result.ok) {
				state.events.push(result.eventToBeDisplayed);
			} else {
				console.error(result.error);
			}
		},
		[startLoadingEvents.fulfilled]: (state, action) => {
			const result = action.payload;
			if (result.ok) {
				state.events = result.events;
			} else {
				console.error(result.error);
			}
		},
		[onEventUpdate.fulfilled]: (state, action) => {
			const result = action.payload;

			if (result.ok) {
				const savedEvent = result.body;

				state.events = state.events.map(event => {
					if (event.id === savedEvent.id) {
						return savedEvent;
					}
					return event;
				});
			} else {
				console.error(result.error);
			}
		}
	}
});

export const {
	addEvent,
	setActiveEvent,
	clearActiveEvent,
	eventUpdated,
	eventDeleted
} = calendarSlice.actions;

export default calendarSlice.reducer;
