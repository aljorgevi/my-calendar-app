import { calendarSlice, onAddNewEvent } from '../../redux/features/calendarSlice';
import { calendarInitialState, calendarWithEventsState, events } from '../fixtures';
import { store } from '../../redux/store';

describe('calendarSlice', () => {
	test('should return the initial state', () => {
		// Assert
		expect(calendarSlice.getInitialState()).toEqual(calendarInitialState);
	});

	test('setActiveEvent should active the event', () => {
		// Arrange
		const state = calendarSlice.reducer(
			calendarWithEventsState,
			calendarSlice.actions.setActiveEvent(events[0])
		);

		// Assert
		expect(state.activeEvents).toEqual(events[0]);
	});

	// TODO: investigate about localStorage token
	/*
	test('onAddNewEvent should add the event', async () => {
		const newEvent = {
			id: '10',
			start: new Date('2022-10-21 13:00:00'),
			end: new Date('2022-10-21 15:00:00'),
			title: 'holidays',
			notes: 'buy drinks and snacks'
		};

		const result = await store.dispatch(onAddNewEvent(newEvent));
		const body = result.payload.body;
		const { events } = store.getState().calendar;
		console.log({ result, body, events });
	});
*/

	test('updateEvent should update the event', () => {});

	test('deleteEvent should delete the event', () => {});
});
