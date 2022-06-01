import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DateTimePicker from 'react-datetime-picker'
import moment from 'moment'
import Modal from 'react-modal'
import Swal from 'sweetalert2'
import { customStyles } from '../../helpers'
import { closeModal } from '../../redux/features/uiSlice'

Modal.setAppElement('#root')

const now = moment().minutes(0).seconds(0).add(1, 'hours')
const _end = now.clone().add(3, 'hours')

const CalendarModal = () => {
	const dispatch = useDispatch()
	const { isModalOpen } = useSelector(store => store.ui)
	const [startDate, setStartDate] = useState(now.toDate())
	const [endDate, setEndDate] = useState(_end.toDate())
	const [isTitleValid, setIsTitleValid] = useState(true)

	const [formValues, setFormValues] = useState({
		title: '',
		notes: '',
		start: now.toDate(),
		end: _end.toDate()
	})

	const { notes, title, start, end } = formValues

	const handleStartDateChange = date => {
		setStartDate(date)
		setFormValues({ ...formValues, start: date })
	}

	const handleEndDateChange = date => {
		setEndDate(date)
		setFormValues({ ...formValues, end: date })
	}

	const closeModalHandler = () => dispatch(closeModal())

	const handleInputChange = event => {
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value
		})
	}

	const handleSubmit = event => {
		event.preventDefault()

		// start & end are normal instances of Date of JS but we need to convert them to moment instances in order to compare them
		// because moment have a method to compare dates
		const momentStart = moment(start)
		const momentEnd = moment(end)

		if (momentStart.isSameOrAfter(momentEnd)) {
			return Swal.fire(
				'Error',
				'La fecha de inicio debe ser anterior a la fecha de fin',
				'error'
			)
		}

		if (title.trim().length < 2) {
			// TODO: we could add as well a errorMessage to display it in the form saying the title is too short
			return setIsTitleValid(false)
		}

		// save in db

		setIsTitleValid(true)
		closeModal()
	}

	return (
		<div>
			<button>Open Modal</button>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={closeModalHandler}
				style={customStyles}
				className='modal'
				overlayClassName='modal-fondo'
				closeTimeoutMS={200}
			>
				<h1> Nuevo evento </h1>
				<hr />
				<form className='container' onSubmit={handleSubmit}>
					<div className='form-group'>
						<label>Fecha y hora inicio</label>
						<DateTimePicker
							onChange={handleStartDateChange}
							value={startDate}
							className='form-control'
						/>
					</div>

					<div className='form-group'>
						<label>Fecha y hora fin</label>
						<DateTimePicker
							onChange={handleEndDateChange}
							value={endDate}
							className='form-control'
							minDate={startDate}
						/>
					</div>

					<hr />
					<div className='form-group'>
						<label>Titulo y notas</label>
						<input
							type='text'
							className={`form-control ${!isTitleValid && 'is-invalid'}`}
							placeholder='Título del evento'
							name='title'
							autoComplete='off'
							value={title}
							onChange={handleInputChange}
						/>
						<small id='emailHelp' className='form-text text-muted'>
							Una descripción corta
						</small>
					</div>

					<div className='form-group'>
						<textarea
							type='text'
							className='form-control'
							placeholder='Notas'
							rows='5'
							name='notes'
							value={notes}
							onChange={handleInputChange}
						></textarea>

						<small id='emailHelp' className='form-text text-muted'>
							Información adicional
						</small>
					</div>
					<button
						type='submit'
						className='btn btn-outline-primary btn-block mt-2'
					>
						<i className='far fa-save'></i>
						<span> Guardar</span>
					</button>
				</form>
			</Modal>
		</div>
	)
}

export default CalendarModal
