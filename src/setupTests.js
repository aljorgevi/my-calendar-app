import '@testing-library/jest-dom';
import { server } from './tests/server';

// Enable API mocking before tests.
beforeAll(() => {
	localStorage.clear();
	server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
