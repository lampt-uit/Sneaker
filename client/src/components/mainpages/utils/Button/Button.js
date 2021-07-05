import React from 'react';
import '../Base.css';
import './Button.css'
function Button({ text }) {
	return (
		<button className='btn form-submit btn-table-mobile' type='submit'>
			{text}    
			<i className='fas fa-arrow-right next'></i>
		</button>
	);
}

export default Button;
