import axios from 'axios';
import moment from 'moment';

const BASE_URL = process.env.REACT_APP_API_URL;

export const messages = {
	allDay: 'Todo el día',
	previous: '<',
	next: '>',
	today: 'Hoy',
	month: 'Mes',
	week: 'Semana',
	day: 'Día',
	agenda: 'Agenda',
	date: 'Fecha',
	time: 'Hora',
	event: 'Evento',
	noEventsInRange: 'No hay eventos en este rango',
	showMore: total => `+ Ver más (${total})`
};

export const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

export const geTokenFromLocalStorage = () => {
	return localStorage.getItem('token');
};

export const fetchWithoutToken = (endpoint, loginDetails, method = 'GET') => {
	const url = `${BASE_URL}/${endpoint}`;
	if (method === 'GET') {
		return axios(url);
	} else {
		return axios({
			method,
			url,
			data: loginDetails
		});
	}
};

export const fetchWithToken = (endpoint, data, method = 'GET') => {
	const url = `${BASE_URL}/${endpoint}`;
	const token = localStorage.getItem('token');
	if (method === 'GET') {
		return axios({
			method,
			url,
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} else {
		return axios({
			method,
			url,
			data,
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	}
};

export const desirializeEvents = events => {
	return events.map(event => {
		return {
			...event,
			start: moment(event.start).toDate(),
			end: moment(event.end).toDate()
		};
	});
};

export const calculateRemainingTime = expirationTime => {
	const currenTime = new Date().getTime();
	const adjExpirationTime = new Date(expirationTime).getTime();

	const remainingTime = adjExpirationTime - currenTime;

	return remainingTime;
};
