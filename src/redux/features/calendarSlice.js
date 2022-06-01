import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import moment from 'moment'

const initialState = {
	events: {
		title: 'All Day Event',
		start: moment().toDate(),
		end: moment().add(2, 'hours').toDate(),
		bgColor: '#f56954',
		user: {
			_id: '123',
			name: 'John Doe'
		}
	},
	activeEvents: null
}

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		addEvent: (state, action) => {
			const event = action.payload
		},
		setActiveEvent: (state, action) => {
			state.activeEvents = action.payload
		}
	}
})

export const { addEvent, setActiveEvent } = calendarSlice.actions

export default calendarSlice.reducer
