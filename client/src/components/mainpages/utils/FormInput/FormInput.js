import React, { useContext, useState } from 'react';

import Button from '../../utils/Button/Button';
import './FormInput.css';
import { GlobalState } from '../../../../GlobalState';
import Toast from '../../utils/Toast/Toast';

function FormInput() {
	const state = useContext(GlobalState);
	const [userInfo] = state.userAPI.userInfo;
	const [toast, setToast] = useState(false);

	return (
		<>
			{toast && <Toast type='err' msg='Chức năng này đang đươc phát triển' />}
			<div className='form_input'>
				<p>Name</p>
				<input type='text' value={userInfo.name} disabled />
				<p>Content</p>
				<div
					contentEditable='true'
					style={{
						height: '100px',
						border: '1px solid #ccc',
						padding: '5px 10px',
						outline: 'none'
					}}
				></div>
				<div onClick={() => setToast(!toast)}>
					<Button text='Send' />
				</div>
			</div>
		</>
	);
}

export default FormInput;
