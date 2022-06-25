// test-utils.jsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Import your own reducer
import uiReducer from '../../redux/features/ui/uiSlice';

function render(
	ui,
	mockStore,
	{
		preloadedState,
		store = configureStore({ reducer: { ui: uiReducer }, preloadedState }),
		...renderOptions
	} = {}
) {
	function Wrapper({ children }) {
		return <Provider store={mockStore ? mockStore : store}>{children}</Provider>;
	}

	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
