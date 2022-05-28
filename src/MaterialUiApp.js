import * as React from 'react'
import TextField from '@mui/material/TextField'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

export default function BasicDatePicker() {
  const [value, setValue] = React.useState(null)

  const handleChange = newValue => {
    console.log({ newValue })
    setValue(newValue)
  }

  return (
    <div className='mt-5'>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label='Basic example'
          value={value}
          onChange={handleChange}
          renderInput={params => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  )
}
