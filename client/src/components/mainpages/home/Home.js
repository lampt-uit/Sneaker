import React, { useState, useEffect } from 'react';
import Banner from '../../banner/Banner';
import Slider from 'react-slick';
import './Home.css';
import Carousel from '../utils/Carousel/Carousel';
import axios from 'axios';

import ImgGirl from '../../../public/images/girl.jpg';
import ImgMen from '../../../public/images/man.jpg';
import ImgKid from '../../../public/images/kid.jpg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Home = () => {
	var settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 5,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	};

	const [sold, setSold] = useState([]);
	const [rating, setRating] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			const res = await axios.get(`/api/products?limit=10&page=1&sort=-sold`);
			// console.log(res);
			setSold(res.data.products);
		};
		getProducts();
	}, []);

	useEffect(() => {
		const getProducts = async () => {
			const res = await axios.get(`/api/products?limit=10&page=1&sort=-rating`);
			// console.log(res);

			setRating(res.data.products);
		};
		getProducts();
	}, []);

	return (
		<div>
			<Banner />
			<div className='home-content'>
				<div className='grid wide'>
					<div className='home-sale'>
						<div className='home-title'>Sale products</div>

						<Slider {...settings}>
							{sold.map((sold_) => (
								<div>
									<Carousel
										image={sold_.image[0]}
										title={sold_.title}
										price={`$ ${sold_.price}`}
									/>
								</div>
							))}
						</Slider>
					</div>
					<div className='home-sale'>
						<div className='home-title'>Best products</div>

						<Slider {...settings}>
							{rating.map((rating_) => (
								<div>
									<Carousel
										image={rating_.image[0]}
										title={rating_.title}
										price={`$ ${rating_.price}`}
									/>
								</div>
							))}
						</Slider>
					</div>

					<div className='home-age'>
						<h2 className='home-title'>Who are you shopping for?</h2>
						<div className='row'>
							<div className='col l-4'>
								<div className='card'>
									<div className='card-img'>
										<div className='card-bg'></div>
										<img src={ImgGirl} alt='' />
									</div>
									<div className='card-title'>
										<p>WOMEN</p>
									</div>
								</div>
							</div>
							<div className='col l-4'>
								<div className='card'>
									<div className='card-img'>
										<div className='card-bg'></div>
										<img src={ImgMen} alt='' />
									</div>
									<div className='card-title'>
										<p>MEN</p>
									</div>
								</div>
							</div>
							<div className='col l-4'>
								<div className='card'>
									<div className='card-img'>
										<div className='card-bg'></div>
										<img src={ImgKid} alt='' />
									</div>
									<div className='card-title'>
										<p>KIDS</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
