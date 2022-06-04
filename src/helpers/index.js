import axios from 'axios';
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

export const fetchWithToken = (endpoint, loginDetails, method = 'GET') => {
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

	// const token = localStorage.getItem('token');
	// const headers = {
	// 	'Content-Type': 'application/json'
	// };

	// if (token) {
	// 	headers['Authorization'] = `Bearer ${token}`;
	// }

	// return fetch(`${BASE_URL}/${endpoint}`, {
	// 	method,
	// 	headers,
	// 	body: JSON.stringify(data)
	// });
};
