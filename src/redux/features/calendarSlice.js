import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import moment from 'moment'

const initialState = {
	events: [
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
	],
	activeEvents: null
}

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		addEvent: (state, action) => {
			const formValues = action.payload
			// Redux Toolkit's createReducer and createSlice automatically use Immer internally to let you write simpler immutable update logic using "mutating" syntax.
			// This helps simplify most reducer implementations.
			// https://redux-toolkit.js.org/usage/immer-reducers
			state.events.push(formValues)
		},
		setActiveEvent: (state, action) => {
			state.activeEvents = action.payload
		},
		clearActiveNote: state => {
			state.activeEvents = null
		},
		eventUpdated: (state, action) => {
			const id = action.payload.id
			state.events = state.events.map(event => {
				if (event.id === id) {
					return action.payload
				}
				return event
			})
		},
		eventDeleted: state => {
			state.events = state.events.filter(
				event => event.id !== state.activeEvents.id
			)
			state.activeEvents = null
		}
	}
})

export const {
	addEvent,
	setActiveEvent,
	clearActiveNote,
	eventUpdated,
	eventDeleted
} = calendarSlice.actions

export default calendarSlice.reducer
