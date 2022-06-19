import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { openModal } from '../../redux/features/ui/uiSlice';
import {
	setActiveEvent,
	clearActiveEvent,
	startLoadingEvents
} from '../../redux/features/calendarSlice';
import { messages } from '../../helpers';
import moment from 'moment';
import Navbar from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import AddNewFab from '../ui/AddNewFab';
import EventDeleteFab from '../ui/EventDeleteFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
	const { events, activeEvents } = useSelector(store => store.calendar);
	const { userId } = useSelector(store => store.users);
	const dispatch = useDispatch();
	const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

	const doubleClickHandler = () => dispatch(openModal());

	const selectEventHandler = event => {
		dispatch(setActiveEvent(event));
	};

	const onViewChange = onViewEvent => {
		setLastView(onViewEvent);
		localStorage.setItem('lastView', onViewEvent);
	};

	const eventStyleGetter = (event, start, end, isSelected) => {
		// const evenUserId = event.user._id;

		// console.log(event.title, event.user._id === userId, {
		// 	evenUserId,
		// 	userId,
		// 	event
		// });

		const style = {
			// backgroundColor different is userId is different that event.user._id
			backgroundColor: event.user._id === userId ? '#367CF7' : '#465660',
			borderRadius: '0px',
			opacity: 0.8,
			color: 'white'
		};

		return {
			style
		};
	};

	const onSelectSlot = event => {
		// TODO: this event allow to select a slot and create a new event
		dispatch(clearActiveEvent());
	};

	useEffect(() => {
		dispatch(startLoadingEvents());
	}, [dispatch]);

	return (
		<section>
			<div className='calendar-screen'>
				<Navbar />
				<Calendar
					localizer={localizer}
					events={events}
					startAccessor='start'
					endAccessor='end'
					messages={messages}
					eventPropGetter={eventStyleGetter}
					components={{ event: CalendarEvent }}
					onDoubleClickEvent={doubleClickHandler}
					onSelectEvent={selectEventHandler}
					onView={onViewChange}
					view={lastView}
					onSelectSlot={onSelectSlot}
					selectable={true}
				/>
			</div>
			<AddNewFab />
			{activeEvents && <EventDeleteFab />}
			<CalendarModal />
		</section>
	);
};

export default CalendarScreen;
