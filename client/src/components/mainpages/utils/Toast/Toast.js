import React, { useState } from 'react';
import './Toast.css';

function Toast({ type, msg }) {
	const [toast, setToast] = useState(true);

	const styleIcon = `toast toast--${type}`;

	const icon =
		type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';

	const styleToast = {
		display: toast ? '' : 'none'
	};
	return (
		<div id='toast' style={styleToast}>
			<div className={styleIcon}>
				<div className='toast__icon'>
					<i className={icon}></i>
				</div>

				<div className='toast__body'>
					<h3 className='toast__title'>{type}</h3>
					<p className='toast__msg'>{msg}</p>
				</div>

				<div className='toast__close' onClick={() => setToast(false)}>
					<i className='fas fa-times'></i>
				</div>
			</div>
		</div>
	);
}

export default Toast;
