import React, { useState } from 'react';
import Button from '../Button/Button';
import './Modal.css';
import { isEmail, isEmpty } from '../Validation/Validation';
import { showErrMsg, showSuccessMsg } from '../Notification/Notification.js';

function Modal({ show }) {
	const [info, setInfo] = useState({ email: '', err: '', success: '' });
	const { email, err, success } = info;

	const handleChangeInput = (e) => {
		setInfo({ email: e.target.value, err: '', success: '' });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isEmpty(email))
			return setInfo({
				...email,
				err: 'Please fill in email.',
				success: ''
			});

		if (!isEmail(email))
			return setInfo({ ...email, err: 'Invalid email.', success: '' });
	};

	return (
		<div
			className='modal-wrapper'
			style={{
				opacity: show ? '1' : '0',
				visibility: show ? '' : 'hidden'
			}}
		>
			<div className='modal-header'>
				<h3>Bạn quên mật khẩu?</h3>
				<p>
					Nhập địa chỉ email của bạn phía dưới, và nếu tài khoản tồn tại, chúng
					tôi sẽ gửi cho bạn một đường dẫn để đặt lại mật khẩu.
				</p>
			</div>
			<div className='modal-content'>
				{err && showErrMsg(err)}
				{success && showSuccessMsg(success)}
				<form className='form-modal' onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='email' className='form-label'>
							Email
						</label>
						<input
							id='email'
							name='email'
							type='email'
							required
							placeholder='Enter email address'
							className='form-control'
							onChange={handleChangeInput}
						/>
					</div>
					<Button text='Send to Email' />
				</form>
			</div>
		</div>
	);
}

export default Modal;
