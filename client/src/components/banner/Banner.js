import React from 'react';
import video from '../../public/video/videoBanner.mp4';
import { Link } from 'react-router-dom';
import Button from '../../components/mainpages/utils/Button/Button';
import './Banner.css';
function Banner() {
	return (
		<div className='container'>
			<video autoPlay loop muted>
				<source src={video} type='video/mp4' />
			</video>
			<div className='content'>
				<img
					src='https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/viVN/Images/originals-ss21-stansmith-drop2-Launch-Sustain-hp-mh-large-1-v1-logo_tcm337-648781.png'
					alt=''
					className='logo'
				/>
				<h2>STAN SMITH, FOREVER</h2>
				<p>
					Sustainable version of the iconic Stan Smith shoe, inspired by uncle
					Kermit frog.
				</p>
				<Link to='/product'>
					<Button text='Go to Buy Now' />
				</Link>
			</div>
		</div>
	);
}

export default Banner;
