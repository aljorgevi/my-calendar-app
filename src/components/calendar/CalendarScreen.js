import { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { messages } from '../../helpers'
import moment from 'moment'
import Navbar from '../ui/Navbar'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import CalendarEvent from './CalendarEvent'

moment.locale('es')

const localizer = momentLocalizer(moment)
const events = [
  {
    title: 'All Day Event',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgColor: '#f56954',
    user: {
      _id: '123',
      name: 'John Doe'
    }
  }
]

const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  )

  const onDoubleClick = e => {
    // console.log(e)
  }

  const onSelectEvent = e => {
    // console.log(e)
  }

  const onViewChange = onViewEvent => {
    setLastView(onViewEvent)
    localStorage.setItem('lastView', onViewEvent)
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  return (
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
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
      />
    </div>
  )
}

export default CalendarScreen
