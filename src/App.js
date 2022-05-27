import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginScreen from './components/auth/LoginScreen'
import CalendarApp from './components/CalendarApp'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<LoginScreen />} />
        <Route exact path='/' element={<CalendarApp />} />
      </Routes>
    </BrowserRouter>
  )
}
