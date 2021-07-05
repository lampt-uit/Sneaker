import { React, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import { GlobalState } from '../../../GlobalState';
import Button from '../utils/Button//Button';
import './DetailProduct.css';
import FormInput from '../utils/FormInput/FormInput';
function DetailProduct() {
	const state = useContext(GlobalState);
	const history = useHistory();
	// console.log(state);
	const [products] = state.productAPI.products;
	const addToCart = state.userAPI.addToCart;
	const { id } = useParams();
	const [isLogged] = state.userAPI.isLogged;
	const details = products.filter((product) => {
		return product._id === id;
	});

	// console.log(products);
	// console.log(details);

	return (
		<>
			{details.map((product) => (
				<div className='home-detail mrt mrb'>
					<div className='grid wide'>
						<div className='breadcrumb'>
							<Link to='#' onClick={() => history.goBack()}>
								<i className='fas fa-arrow-left'></i>Back
							</Link>
						</div>
						<div className='row'>
							<div className='col l-8 m-12 c-12'>
								<div className='home-detail-content'>
									<div className='home-detail-item'>
										<div className='home-detail-img'>
											<img src={product.image[0]} alt='' />
										</div>
									</div>
									<div className='home-detail-description'>
										<div className='row sm-gutter'>
											<div className='col l-12'>
												<h2 className='title'>Description</h2>
											</div>
											<div className='col l-6'>
												<div className='text-content'>
													<h2 className='name'>{product.title}</h2>
													<p className='text'>{product.description}</p>
												</div>
											</div>
											<div className='col l-6'>
												<img
													src={product.image[1]}
													className='thumb_img'
													alt=''
												/>
											</div>
										</div>
									</div>
									<div className='home-detail-description'>
										<div className='row sm-gutter'>
											<div className='col l-12'>
												<h2 className='title'>Content</h2>
											</div>

											<div className='col l-6'>
												<ul className='list-parameters'>
													<li>Fits like socks</li>

													<li>With shoelaces</li>

													<li>Textile lining</li>
												</ul>
											</div>
											<div className='col l-6'>
												<ul className='list-parameters'>
													<li>Weight: 340 g</li>
													<li>S-shaped heel pad</li>
													<li>Primeblue</li>
												</ul>
											</div>
										</div>
									</div>
									<div className='relate-thumb'>
										<h1>Relate Product</h1>
										<div>
											{products.map((product_) => {
												return product_.category === product.category &&
													product_._id !== product._id ? (
													<Link to={`/product/${product_._id}`}>
														<img src={product_.image[0]} alt='' />
													</Link>
												) : null;
											})}
										</div>
									</div>
									{!isLogged ? (
										<h2 style={{ marginTop: '50px' }}>
											Please
											<Link to='/login'> Login</Link> to rating and comment
											about product.
										</h2>
									) : (
										<>
											<h1 style={{ marginTop: '50px' }}>Reviews</h1>
											<div className='reviews'>
												<input type='radio' name='rate' id='rd-5' />
												<label htmlFor='rd-5' className='fas fa-star'></label>

												<input type='radio' name='rate' id='rd-4' />
												<label htmlFor='rd-4' className='fas fa-star'></label>

												<input type='radio' name='rate' id='rd-3' />
												<label htmlFor='rd-3' className='fas fa-star'></label>

												<input type='radio' name='rate' id='rd-2' />
												<label htmlFor='rd-2' className='fas fa-star'></label>

												<input type='radio' name='rate' id='rd-1' />
												<label htmlFor='rd-1' className='fas fa-star'></label>
											</div>
											<FormInput />
										</>
									)}
								</div>
							</div>
							<div className='col l-4 m-0 c-0'>
								<div className='detail-slidebar'>
									<h2 className='detail-name'>{product.title}</h2>
									<p className='detail-price'>$ {product.price}</p>
									<div className='detail-size'>
										<h3 className='name-size'>Sizes Available</h3>
										<div className='container-size'>
											{product.size.map((size, index) => (
												<button key={index}>{size}</button>
											))}
										</div>
									</div>
									<Link to='/cart' onClick={() => addToCart(product._id)}>
										<Button text='Add to my cart' />
									</Link>
									<div className='promotion'>
										<div className='promotion-icon'>
											<i class='fas fa-truck'></i>
										</div>
										<div className='promotion-content'>
											<Link className='promotion-link'>Learn More</Link>
											<p className='promotion-text'>Free delivery over 10$</p>
										</div>
									</div>
									<div className='promotion'>
										<div className='promotion-icon'>
											<i class='fas fa-undo-alt'></i>
										</div>
										<div className='promotion-content'>
											<Link className='promotion-link'>
												Easy return product
											</Link>
											<p className='promotion-text'>
												Not the right size or colour? Visit our returns page for
												details.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export default DetailProduct;
