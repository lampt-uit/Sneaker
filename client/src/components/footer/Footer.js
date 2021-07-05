import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Footer.css';
const Footer = () => {
	const [status, setStatus] = useState({ err: '', success: '' });
	const formik = useFormik({
		initialValues: {
			email: ''
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.trim()
				.email('Email invalid')
				.required('Please enter this field.')
		}),
		onSubmit: async (values, { resetForm }) => {
			try {
				const res = await axios.post('/user/email_subscribe', values);
				setStatus({ ...status, err: '', success: res.data.msg });
				resetForm();
			} catch (error) {
				error.response.data.msg &&
					setStatus({ ...status, err: error.response.data.msg, success: '' });
			}
		}
	});
	return (
		<div className='footer'>
			<div className='grid wide footer-top'>
				<div className='row '>
					<div className='col l-8'>
						<div className='row'>
							<div className='col l-4'>
								<h2 className='footer-title'>About Us</h2>
								<ul className='footer-list'>
									<li className='footer-item'>
										<Link to='#' className='footer-link'>
											Tấn Lâm
										</Link>
									</li>
									<li className='footer-item'>
										<Link to='#' className='footer-link'>
											Đông Sinh
										</Link>
									</li>
									<li className='footer-item'>
										<Link to='#' className='footer-link'>
											Minh Thành
										</Link>
									</li>
									<li className='footer-item'>
										<Link to='#' className='footer-link'>
											Kim Thắng
										</Link>
									</li>
								</ul>
							</div>
							<div className='col l-4'>
								<h2 className='footer-title'>Contact Us</h2>
								<ul className='footer-list'>
									<li className='footer-item'>
										<Link to='#' className='footer-link'>
											KTX Khu A - Đông Hòa - Dĩ An
										</Link>
									</li>
									<li className='footer-item'>
										<Link to='#' className='footer-link'>
											0324-xxx-xxx
										</Link>
									</li>
								</ul>
							</div>
							<div className='col l-4'>
								<h2 className='footer-title'>Why choose Vatino ?</h2>
								<ul className='footer-list'>
									<li className='footer-item'>
										<Link to='#' className='footer-link'>
											Free Ship
										</Link>
									</li>
									<li className='footer-item'>
										<Link to='#' className='footer-link'>
											Membership card
										</Link>
									</li>
									<li className='footer-item'>
										<Link to='#' className='footer-link'>
											Promotion policy
										</Link>
									</li>
									<li className='footer-item'>
										<Link to='#' className='footer-link'>
											Exchange policy
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className='col l-4'>
						<h2 className='footer-title'>
							Subscribe to receive a promotion through email{' '}
						</h2>
						<form onSubmit={formik.handleSubmit}>
							<div className=''>
								<input
									id='email'
									name='email'
									type='text'
									placeholder='Please enter your email'
									className='form-control'
									onChange={formik.handleChange}
									value={formik.values.email}
								/>
								<br />
								{formik.errors.email && formik.touched.email && (
									<span className='form-message'>{formik.errors.email}</span>
								)}
							</div>
							<button className='btn-confirm'>Subscribe</button>
						</form>
					</div>
				</div>

				<div className='social'>
					<Link to='#' className='social-link'>
						<i class='fab fa-facebook-f'></i>
					</Link>
					<Link to='#' className='social-link'>
						<i class='fab fa-google-plus-g'></i>
					</Link>
					<Link to='#' className='social-link'>
						<i class='fab fa-instagram'></i>
					</Link>
				</div>

				<div className='policy'>
					<Link to='#' className='policy-link'>
						Terms and condition
					</Link>
					<Link to='#' className='policy-link'>
						Privacy Policy
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Footer;
