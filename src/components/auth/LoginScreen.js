import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/features/usersSlice';
import { useForm } from '../../hooks/useForm';
import './login.css';

export default function LoginScreen() {
	const dispatch = useDispatch();
	const [formLoginValues, handleLoginInputChange] = useForm({
		login_email: 'admin@email.com',
		login_password: 'password'
	});

	const { login_email, login_password } = formLoginValues;

	const handleLoginSubmit = event => {
		event.preventDefault();

		const loginDetails = {
			email: login_email,
			password: login_password
		};

		dispatch(userLogin(loginDetails));
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
					<form>
						<div className='form-group'>
							<input
								type='text'
								className='form-control'
								placeholder='Nombre'
							/>
						</div>
						<div className='form-group'>
							<input
								type='email'
								className='form-control'
								placeholder='Correo'
							/>
						</div>
						<div className='form-group'>
							<input
								type='password'
								className='form-control'
								placeholder='Contraseña'
							/>
						</div>

						<div className='form-group'>
							<input
								type='password'
								className='form-control'
								placeholder='Repita la contraseña'
							/>
						</div>

						<div className='form-group'>
							<input type='submit' className='btnSubmit' value='Crear cuenta' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
