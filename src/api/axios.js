import axios from 'axios';
import moment from 'moment';
import { geTokenFromLocalStorage } from '../helpers';

const BASE_URL = process.env.REACT_APP_API_URL;

export const customFetch = axios.create({
	baseURL: BASE_URL
});

customFetch.interceptors.request.use(config => {
	const token = geTokenFromLocalStorage();
	if (token) {
		config.headers.common['Authorization'] = `Bearer ${token}`;
	}
	return config;
});
