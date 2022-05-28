const CalendarEvent = ({ event }) => {
  const { title, user } = event
  return (
    <>
      <span>{title}</span>
      <strong>- {user.name}</strong>
    </>
  )
}

export default CalendarEvent
