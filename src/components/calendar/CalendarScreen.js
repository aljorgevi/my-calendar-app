import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import Navbar from '../ui/Navbar'

const localizer = momentLocalizer(moment)
const events = [
  {
    title: 'All Day Event',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgColor: '#f56954'
  }
]

const CalendarScreen = () => {
  return (
    <div className='calendar-screen'>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
      />
    </div>
  )
}

export default CalendarScreen
