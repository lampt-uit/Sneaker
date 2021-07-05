import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import './Profile.css';
import { GlobalState } from '../../../GlobalState';
import Button from '../utils/Button/Button';
import Toast from '../utils/Toast/Toast';
import { showErrMsg } from '../utils/Notification/Notification';
function Profile() {
	const [toggle, setToggle] = useState(1);
	const toggleTab = (index) => {
		setToggle(index);
	};
	const _state = useContext(GlobalState);
	const [userInfo] = _state.userAPI.userInfo;
	const [state, setState] = useState({ err: '', success: '' });
	const [state2, setState2] = useState({ err: '', success: '' });

	const [token, setToken] = _state.token;
	const { err } = state;

	const formik = useFormik({
		initialValues: {
			name: userInfo.name || '',
			phone: userInfo.phone || '',
			address: userInfo.address || ''
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Please enter this field.'),
			phone: Yup.number()
				.typeError("That doesn't look like a phone number")
				.positive("A phone number can't start with a minus")
				.integer("A phone number can't include a decimal point")
				.min(8)
				.required('A phone number is required'),
			address: Yup.string().required('Please enter this field.')
		}),
		onSubmit: async (values) => {
			try {
				// console.log(values);
				const res = await axios.patch('/user/updateUserInfo', values, {
					headers: { Authorization: token }
				});
				// console.log(res);
				setState2({ ...state2, err: '', success: res.data.message });
				//
				const resp = await axios.get('/user/refresh_token');
				// console.log(resp.data.accesstoken);
				setToken(resp.data.accesstoken);
			} catch (error) {
				// console.log(error.response);
				error.response.data.message &&
					setState2({
						...state2,
						err: error.response.data.message,
						success: ''
					});
			}
		}
	});

	const formik2 = useFormik({
		initialValues: {
			password: '',
			new_password: '',
			password_confirmation: ''
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.min(6, 'Please enter at least 6 characters.')
				.required('Please enter this field.'),
			new_password: Yup.string()
				.min(6, 'Please enter at least 6 characters.')
				.required('Please enter this field.'),
			password_confirmation: Yup.string()
				.oneOf([Yup.ref('new_password')], 'Re-entered password is incorrect.')
				.required('Please enter this field.')
		}),
		onSubmit: async (values, { resetForm }) => {
			try {
				// console.log(values);
				const res = await axios.patch('/user/changePassword', values, {
					headers: { Authorization: token }
				});
				// console.log(res);
				setState({ ...state, err: '', success: res.data.message });
				resetForm();
			} catch (error) {
				error.response.data.message &&
					setState({ ...state, err: error.response.data.message, success: '' });
			}
		}
	});

	return (
		<div>
			{state.success && <Toast type='success' msg={state.success} />}
			{state2.success && <Toast type='success' msg={state2.success} />}
			<div className='profile mrt'>
				<div className='grid wide'>
					<div className='row'>
						<div className='col l-3'>
							<div className='userpage-sliderbar'>
								<div className='user-page-avatar'>
									<img
										src={userInfo.avatar}
										alt=''
										height='45px'
										width='45px'
										className='user-page-avatar-img'
									/>
									<div className='info'>
										<p className=''>Account of</p>
										<strong>{userInfo.name}</strong>
									</div>
								</div>
								<div className='user-page-menu'>
									<button
										className={toggle === 1 ? 'tabs active-tabs' : 'tabs'}
										onClick={() => toggleTab(1)}
									>
										<i class='fas fa-user'></i>
										<span>Account information</span>
									</button>
									<button
										className={toggle === 2 ? 'tabs active-tabs' : 'tabs'}
										onClick={() => toggleTab(2)}
									>
										<i class='fas fa-unlock'></i>
										<span>Change password</span>
									</button>
								</div>
							</div>
						</div>
						<div className='col l-9'>
							<div
								className={
									toggle === 1 ? 'tabs-content active-content' : 'tabs-content'
								}
							>
								<div className='tabs-heading'>
									<p>Account Information</p>
								</div>
								<div className='my-account'>
									<form className='form-profile' onSubmit={formik.handleSubmit}>
										<div className='form-group-profile'>
											<label htmlFor='name' className='label'>
												Full name
											</label>
											<div className='form-group-input'>
												<input
													id='name'
													name='name'
													type='text'
													onChange={formik.handleChange}
													value={formik.values.name}
												/>
												{formik.errors.name && formik.touched.name && (
													<span className='form-message'>
														{formik.errors.name}
													</span>
												)}
											</div>
										</div>
										<div className='form-group-profile'>
											<label htmlFor='email' className='label'>
												Your email{' '}
												<span style={{ color: 'crimson', fontSize: '10px' }}>
													{' '}
													* Not change
												</span>
											</label>
											<div className='form-group-input'>
												<input
													id='email'
													name='email'
													type='text'
													defaultValue={userInfo.email}
													disabled
												/>
											</div>
										</div>
										<div className='form-group-profile'>
											<label htmlFor='phone' className='label'>
												Phone
											</label>
											<div className='form-group-input'>
												<input
													id='phone'
													name='phone'
													type='text'
													onChange={formik.handleChange}
													value={formik.values.phone}
												/>
												{formik.errors.phone && formik.touched.phone && (
													<span className='form-message'>
														{formik.errors.phone}
													</span>
												)}
											</div>
										</div>
										<div className='form-group-profile'>
											<label htmlFor='address' className='label'>
												Address
											</label>
											<div className='form-group-input'>
												<input
													id='address'
													name='address'
													type='text'
													onChange={formik.handleChange}
													value={formik.values.address}
												/>
												{formik.errors.address && formik.touched.address && (
													<span className='form-message'>
														{formik.errors.address}
													</span>
												)}
											</div>
										</div>
										<Button text='Update' />
									</form>
								</div>
							</div>

							<div
								className={
									toggle === 2 ? 'tabs-content active-content' : 'tabs-content'
								}
							>
								<div className='tabs-heading'>
									<p>Change password</p>
								</div>
								<div className='my-account'>
									<form
										className='form-profile'
										onSubmit={formik2.handleSubmit}
									>
										{err && showErrMsg(err)}
										<div className='form-group-profile'>
											<label htmlFor='password' className='label'>
												Current password
											</label>
											<div className='form-group-input'>
												<input
													id='password'
													name='password'
													type='password'
													placeholder='Please enter current password'
													onChange={formik2.handleChange}
													value={formik2.values.password}
												/>
												{formik2.errors.password &&
													formik2.touched.password && (
														<span className='form-message'>
															{formik2.errors.password}
														</span>
													)}
											</div>
										</div>
										<div className='form-group-profile'>
											<label htmlFor='new_password' className='label'>
												New password
											</label>
											<div className='form-group-input'>
												<input
													id='new_password'
													name='new_password'
													type='password'
													placeholder='Please enter new password'
													onChange={formik2.handleChange}
													value={formik2.values.new_password}
												/>
												{formik2.errors.new_password &&
													formik2.touched.new_password && (
														<span className='form-message'>
															{formik2.errors.new_password}
														</span>
													)}
											</div>
										</div>
										<div className='form-group-profile'>
											<label htmlFor='password_confirmation' className='label'>
												Confirm new password
											</label>
											<div className='form-group-input'>
												<input
													id='password_confirmation'
													name='password_confirmation'
													placeholder='Please enter new password again'
													type='password'
													onChange={formik2.handleChange}
													value={formik2.values.password_confirmation}
												/>
												{formik2.errors.password_confirmation &&
													formik2.touched.password_confirmation && (
														<span className='form-message'>
															{formik2.errors.password_confirmation}
														</span>
													)}
											</div>
										</div>
										<Button text='Update' />
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
