import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

import Button from '../utils/Button/Button';
import './ForgotPassword.css';
import { showErrMsg, showSuccessMsg } from '../utils/Notification/Notification';
function ForgotPassword() {
	const { token } = useParams();
	const [state, setState] = useState({ err: '', success: '' });
	const { err, success } = state;
	const formik = useFormik({
		initialValues: {
			password: '',
			password_confirmation: ''
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.min(6, 'Please enter at least 6 characters.')
				.required('Please enter this field.'),
			password_confirmation: Yup.string()
				.oneOf([Yup.ref('password')], 'Re-entered password is incorrect.')
				.required('Please enter this field.')
		}),
		onSubmit: async (values, { resetForm }) => {
			// console.log(values.password);
			try {
				const res = await axios.post('/user/resetPassword', values, {
					headers: { Authorization: token }
				});
				// console.log(res);
				setState({ ...state, err: '', success: res.data.message });
				window.location.href = '/login';
			} catch (error) {
				error.response.data.message &&
					setState({ ...state, err: error.response.data.message, success: '' });
			}
		}
	});
	return (
		<>
			<div className='forgot mrt mrb'>
				<div className='grid wide'>
					<div className='row'>
						<div className='col l-6'>
							<form
								action=''
								className='form-forgot'
								onSubmit={formik.handleSubmit}
							>
								<h2 className='heading-forgot'>Create a new password</h2>
								{err && showErrMsg(err)}
								{success && showSuccessMsg(success)}
								<div className='form-group'>
									<label htmlFor='password' className='form-label'>
										Password
									</label>
									<input
										id='password'
										name='password'
										type='password'
										placeholder='Please enter new password'
										className='form-control'
										onChange={formik.handleChange}
										value={formik.values.password}
									/>
									{formik.errors.password && formik.touched.password && (
										<span className='form-message'>
											{formik.errors.password}
										</span>
									)}
								</div>
								<div className='form-group'>
									<label htmlFor='password_confirmation' className='form-label'>
										Confirm password
									</label>
									<input
										id='password_confirmation'
										name='password_confirmation'
										type='password'
										placeholder='Please enter new password again'
										className='form-control'
										onChange={formik.handleChange}
										value={formik.values.password_confirmation}
									/>
									{formik.errors.password_confirmation &&
										formik.touched.password_confirmation && (
											<span className='form-message'>
												{formik.errors.password_confirmation}
											</span>
										)}
								</div>

								<Button text='Update' />
							</form>
						</div>
						<div className='col l-6'>
							<h1>This is my reset password page</h1>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ForgotPassword;
