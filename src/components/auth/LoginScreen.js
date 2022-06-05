import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	loginHandler,
	userRegister,
	onCloseErrorSnackbar,
	onCloseSuccessSnackbar
} from '../../redux/features/usersSlice';
import { useForm } from '../../hooks/useForm';
import './login.css';
import Swal from 'sweetalert2';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function LoginScreen() {
	const [open, setOpen] = useState(false);
	const {
		showSuccessSnackbar,
		showErrorSnackbar,
		errorMessage,
		successMessage
	} = useSelector(store => store.users);
	const dispatch = useDispatch();
	const [formLoginValues, handleLoginInputChange] = useForm({
		login_email: 'admin@email.com',
		login_password: 'password'
	});

	const { login_email, login_password } = formLoginValues;

	const [formRegisternValues, handleRegisterInputChange, reset] = useForm({
		register_username: '',
		register_email: '',
		register_password: '',
		register_password_confirm: ''
	});

	const {
		register_username,
		register_email,
		register_password,
		register_password_confirm
	} = formRegisternValues;

	const handleLoginSubmit = event => {
		event.preventDefault();

		const loginDetails = {
			email: login_email,
			password: login_password
		};

		dispatch(loginHandler(loginDetails));
	};

	const handleRegisterSubmit = event => {
		event.preventDefault();

		if (register_password !== register_password_confirm) {
			return Swal.fire({
				title: 'Error',
				text: 'Password and Confirm Password must be the same',
				icon: 'error'
			});
		}

		const registerDetails = {
			username: register_username,
			email: register_email,
			password: register_password
		};

		dispatch(userRegister(registerDetails)).then(res => {
			if (!res.payload.error) {
				reset();
			}
		});
	};

	const handleCloseErrorSnackbar = (_, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		dispatch(onCloseErrorSnackbar());
	};

	const handleCloseSuccessSnackbar = (_, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch(onCloseSuccessSnackbar());
	};

	return (
		<div className='container login-container'>
			<div className='row'>
				<div className='col-md-6 login-form-1'>
					<h3>Ingreso</h3>
					<form onSubmit={handleLoginSubmit}>
						<div className='form-group'>
							<input
								type='text'
								className='form-control'
								placeholder='Correo'
								name='login_email'
								value={login_email}
								onChange={handleLoginInputChange}
							/>
						</div>
						<div className='form-group'>
							<input
								type='password'
								className='form-control'
								placeholder='Contraseña'
								name='login_password'
								value={login_password}
								onChange={handleLoginInputChange}
							/>
						</div>
						<div className='form-group'>
							<input type='submit' className='btnSubmit' value='Login' />
						</div>
					</form>
				</div>

				<div className='col-md-6 login-form-2'>
					<h3>Registro</h3>
					<form onSubmit={handleRegisterSubmit}>
						<div className='form-group'>
							<input
								type='text'
								className='form-control'
								placeholder='Nombre'
								name='register_username'
								value={register_username}
								onChange={handleRegisterInputChange}
							/>
						</div>
						<div className='form-group'>
							<input
								type='email'
								className='form-control'
								placeholder='Correo'
								name='register_email'
								value={register_email}
								onChange={handleRegisterInputChange}
							/>
						</div>
						<div className='form-group'>
							<input
								type='password'
								className='form-control'
								placeholder='Contraseña'
								name='register_password'
								value={register_password}
								onChange={handleRegisterInputChange}
							/>
						</div>

						<div className='form-group'>
							<input
								type='password'
								className='form-control'
								placeholder='Repita la contraseña'
								name='register_password_confirm'
								value={register_password_confirm}
								onChange={handleRegisterInputChange}
							/>
						</div>

						<div className='form-group'>
							<input type='submit' className='btnSubmit' value='Crear cuenta' />
						</div>
					</form>
				</div>
			</div>
			<Snackbar
				open={showSuccessSnackbar}
				autoHideDuration={3000}
				onClose={handleCloseSuccessSnackbar}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert
					onClose={handleCloseSuccessSnackbar}
					severity='success'
					sx={{ width: '100%' }}
				>
					{successMessage}
				</Alert>
			</Snackbar>
			<Snackbar
				open={showErrorSnackbar}
				autoHideDuration={3000}
				onClose={handleCloseErrorSnackbar}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert
					onClose={handleCloseErrorSnackbar}
					severity='error'
					sx={{ width: '100%' }}
				>
					{errorMessage}
				</Alert>
			</Snackbar>
		</div>
	);
}
