import { uiSlice } from '../../redux/features/ui/uiSlice';

describe('uiSlice', () => {
	test('should return the initial state', () => {
		// Assert
		expect(uiSlice.getInitialState()).toEqual({
			isModalOpen: false
		});
	});

	test('should handle openModal', () => {
		// Arrange
		let state = uiSlice.getInitialState();

		// Act
		state = uiSlice.reducer(state, uiSlice.actions.openModal());

		// Assert
		expect(state.isModalOpen).toBe(true);
	});

	test('should handle closeModal', () => {
		// Arrange
		let state = uiSlice.getInitialState();
		state = uiSlice.reducer(state, uiSlice.actions.openModal());

		// Act
		state = uiSlice.reducer(state, uiSlice.actions.closeModal());

		// Assert
		expect(state.isModalOpen).toBe(false);
	});
});
