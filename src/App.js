import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginScreen from './components/auth/LoginScreen'
import CalendarApp from './components/CalendarApp'
import MaterialUiApp from './MaterialUiApp'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<LoginScreen />} />
        <Route exact path='/' element={<CalendarApp />} />
        <Route path='/material' element={<MaterialUiApp />} />
      </Routes>
    </BrowserRouter>
  )
}
