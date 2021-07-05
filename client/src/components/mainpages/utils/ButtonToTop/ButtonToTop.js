import React, { useState } from 'react';
import './ButtonToTop.css';

function ButtonToTop() {
	const [state, setState] = useState(true);
	window.onscroll = function () {
		scrollFunction();
	};

	const scrollFunction = () => {
		if (
			document.body.scrollTop > 40 ||
			document.documentElement.scrollTop > 40
		) {
			setState(true);
		} else {
			setState(false);
		}
	};
	const style = {
		display: state ? 'block' : 'none'
	};

	const topFunction = () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	};
	return (
		<button
			style={style}
			className='ButtonTopTop'
			title='Go To Top'
			onClick={() => topFunction()}
		>
			<i class='fas fa-arrow-up'></i>
		</button>
	);
}

export default ButtonToTop;
