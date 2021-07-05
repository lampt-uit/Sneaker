import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import './Login.css';
import { showErrMsg, showSuccessMsg } from '../utils/Notification/Notification';
import Button from '../utils/Button/Button';

function Register() {
	const [state, setState] = useState({ err: '', success: '' });
	const { err, success } = state;
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			password_confirmation: '',
			name: ''
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Please enter this field.'),
			email: Yup.string()
				.trim()
				.email('Email invalid')
				.required('Please enter this field.'),
			password: Yup.string()
				.min(6, 'Please enter at least 6 characters.')
				.required('Please enter this field.'),
			password_confirmation: Yup.string()
				.oneOf([Yup.ref('password')], 'Re-entered password is incorrect.')
				.required('Please enter this field.')
		}),
		onSubmit: async (values, { resetForm }) => {
			try {
				const res = await axios.post('/user/register', { ...values });
				// console.log(res);
				setState({ err: '', success: res.data.message });
				localStorage.setItem('firstLogin', true);
				window.location.href = '/';
				resetForm();
			} catch (error) {
				error.response.data.msg &&
					setState({ err: error.response.data.msg, success: '' });
			}
		}
	});

	return (
		<div className='login mrt mrb'>
			<div className='grid wide'>
				<div className='row app-content'>
					<div className='col l-6 m-12 c-12'>
						<form action='' className='form' onSubmit={formik.handleSubmit}>
							<h2 className='heading heading-register'>Register</h2>
							{err && showErrMsg(err)}
							{success && showSuccessMsg(success)}
							<div className='form-group'>
								<label htmlFor='name' className='form-label'>
									Full Name
								</label>
								<input
									id='name'
									name='name'
									type='text'
									onChange={formik.handleChange}
									value={formik.values.name}
									placeholder='Kimthang'
									className='form-control'
								/>
								{formik.errors.name && formik.touched.name && (
									<span className='form-message'>{formik.errors.name}</span>
								)}
							</div>
							<div className='form-group'>
								<label htmlFor='email' className='form-label'>
									Email
								</label>
								<input
									id='email'
									name='email'
									type='text'
									onChange={formik.handleChange}
									value={formik.values.email}
									placeholder='Kimthang@gmai.com'
									className='form-control'
								/>
								{formik.errors.email && formik.touched.email && (
									<span className='form-message'>{formik.errors.email}</span>
								)}
							</div>
							<div className='form-group'>
								<label htmlFor='password' className='form-label'>
									Password
								</label>
								<input
									id='password'
									name='password'
									type='password'
									onChange={formik.handleChange}
									value={formik.values.password}
									placeholder='Enter password'
									className='form-control'
								/>

								{formik.errors.password && formik.touched.password && (
									<span className='form-message'>{formik.errors.password}</span>
								)}
							</div>
							<div className='form-group'>
								<label htmlFor='password_confirmation' className='form-label'>
									Confirm Password
								</label>
								<input
									id='password_confirmation'
									name='password_confirmation'
									type='password'
									onChange={formik.handleChange}
									value={formik.values.password_confirmation}
									placeholder='Enter password again'
									className='form-control'
								/>

								{formik.errors.password_confirmation &&
									formik.touched.password_confirmation && (
										<span className='form-message'>
											{formik.errors.password_confirmation}
										</span>
									)}
							</div>

							<Button text='Register' />
						</form>
					</div>
					<div className='col l-6 m-12 c-12'>
						<div className='reason'>
							<h2 className='heading'>CREATE AN ACCOUNT</h2>
							<p className='desc'>Your Global Login will give you access to:</p>
							<div className='content'>
								<ul>
									<li>
										<i className='fal fa-check'></i>
										<span>
											A single global login to interact with adidas products and
											services
										</span>
									</li>
									<li>
										<i className='fal fa-check'></i>
										<span>Checkout faster</span>
									</li>
									<li>
										<i className='fal fa-check'></i>
										<span>View your personal order history</span>
									</li>
									<li>
										<i className='fal fa-check'></i>
										<span>Add or change email preferences</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
