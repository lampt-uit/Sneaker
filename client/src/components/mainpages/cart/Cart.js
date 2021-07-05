import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { GlobalState } from '../../../GlobalState';
import Button from '../utils/Button/Button';
import { isEmpty, isPhone } from '../utils/Validation/Validation.js';
import { showErrMsg } from '../utils/Notification/Notification';
import './Cart.css';

function Cart() {
	const state = useContext(GlobalState);
	const [cart, setCart] = state.userAPI.cart;
	const [callback, setCallback] = state.userAPI.callback;
	const [userInfo] = state.userAPI.userInfo;
	const [isLogged] = state.userAPI.isLogged;
	const [total, setTotal] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [status, setStatus] = useState('');
	const [data, setData] = useState({
		name: '',
		address: '',
		phone: '',
		note: ''
	});
	const { name, address, phone } = data;

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		//Clone new Array =>avoid tham tri
		setData({ ...data, [name]: value });
	};

	useEffect(() => {
		const getTotal = () => {
			const total = cart.reduce((prev, item) => {
				return prev + item.price * item.count;
			}, 0);
			setTotal(total);
		};
		const getQuantity = () => {
			const quantity = cart.reduce((prev, item) => {
				return prev + item.count;
			}, 0);
			setQuantity(quantity);
		};
		getTotal();
		getQuantity();
	}, [cart]);

	const increase = (id) => {
		cart.forEach((item) => {
			if (item._id === id) {
				item.count === item.stock
					? (item.count = item.stock)
					: (item.count += 1);
			}
		});
		setCart([...cart]);
	};

	const decrease = (id) => {
		cart.forEach((item) => {
			if (item._id === id) {
				item.count === 1 ? (item.count = 1) : (item.count -= 1);
			}
		});
		setCart([...cart]);
	};

	const remove = (id) => {
		if (
			window.confirm('Do you want to delete this product from your cart? ?')
		) {
			cart.forEach((item, index) => {
				if (item._id === id) {
					cart.splice(index, 1);
				}
			});
			setCart([...cart]);
			setCallback(!callback);
		}
	};

	const handleChangeSize = (id, value) => {
		cart.forEach((item) => {
			if (item._id === id) {
				item.sizesl = value;
			}
		});
		setCart([...cart]);
	};

	const id = userInfo._id;
	const proceed = async () => {
		if (!isLogged) {
			if (isEmpty(name) || isEmpty(phone) || isEmpty(address))
				return setStatus('Please fill in all fields.');
			if (!isPhone(phone))
				return setStatus('Please enter the correct phone number');
		}

		if (window.confirm('Are you sure you want to order? ?')) {
			try {
				setCart([]);
				!isLogged
					? await axios.post('/api/payments', { cart, ...data })
					: await axios.post('/api/payments', { cart, ...data, id });
			} catch (error) {
				alert(error.response.data.message);
			}
		}
	};

	if (cart.length === 0) {
		return (
			<h2
				style={{
					textAlign: 'center',
					fontSize: '5rem',
					paddingTop: '147px',
					marginBottom: '114px'
				}}
			>
				Cart Empty
			</h2>
		);
	}
	return (
		<div className='cart-container mrt mrb'>
			<div className='grid wide'>
				<div className='row'>
					<div className='col l-8'>
						<div className='cart-title'>
							<h4>Your cart</h4>
							<Link to='/product'>Continue shopping</Link>
						</div>
						{cart.map((product) => (
							<div className='row cart-detail'>
								<div className='col l-2'>
									<div className='product_cart'>
										<img src={product.image[0]} alt='' className='cart_link' />
									</div>
								</div>
								<div className='col l-10'>
									<div className='row'>
										<div className='col l-6 content'>
											<h3 className='content-title'>{product.title}</h3>
											<span className='content-price'>${product.price}</span>
											<div className='content-stock'>
												In Stock: {product.stock}
											</div>
										</div>

										<div className='col l-3 select'>
											<div className='amount'>
												<Link onClick={() => decrease(product._id)}>-</Link>
												<span>{product.count}</span>
												<Link onClick={() => increase(product._id)}>+</Link>
											</div>

											<span>Select Size: </span>
											<select
												className='select-size'
												onChange={(e) =>
													handleChangeSize(
														product._id,
														e.target.value || product.size[0]
													)
												}
											>
												<option disabled selected>
													Size
												</option>
												{product.size.map((size) => (
													<option value={size}>{size}</option>
												))}
											</select>
										</div>
										<div className='col l-3 cart-price'>
											<h3 className='total_price'>
												$ {product.price * product.count}
											</h3>
											<span
												className='delete'
												onClick={() => remove(product._id)}
											>
												Remove
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className='col l-4'>
						<div className='cart-warpper'>
							<h1>Delivery information </h1>
							<div className='address'>
								<form className='form'>
									{status && showErrMsg(status)}
									<div className='form-group'>
										<label htmlFor='name' className='form-label'>
											Full Name <span style={{ color: 'crimson' }}>*</span>
										</label>
										<input
											id='name'
											name='name'
											type='text'
											defaultValue={userInfo.name}
											className='input'
											onChange={onChangeInput}
										/>
									</div>
									<div className='form-group'>
										<label htmlFor='phone' className='form-label'>
											Phone <span style={{ color: 'crimson' }}>*</span>
										</label>
										<input
											id='phone'
											name='phone'
											type='text'
											defaultValue={userInfo.phone}
											className='input'
											onChange={onChangeInput}
										/>
									</div>
									<div className='form-group'>
										<label htmlFor='address' className='form-label'>
											Address <span style={{ color: 'crimson' }}>*</span>
										</label>
										<input
											id='address'
											name='address'
											type='text'
											defaultValue={userInfo.address}
											className='input'
											onChange={onChangeInput}
										/>
									</div>
									<div className='form-group'>
										<label htmlFor='note' className='form-label'>
											Note
										</label>
										<textarea
											name='note'
											id='note'
											cols='1'
											rows='3'
											onChange={onChangeInput}
										/>
									</div>
								</form>
							</div>
						</div>
						<div className='order'>
							<div className='cart-warpper'>
								<h1>Order Information</h1>
								<div className='order-content'>
									<p>
										Total number of products:{' '}
										<span
											style={{
												color: 'crimson',
												fontWeight: 500,
												fontSize: '20px'
											}}
										>
											{quantity}
										</span>
									</p>
									<p>
										Payment method:{' '}
										<span
											style={{
												color: 'crimson',
												fontWeight: 500,
												fontSize: '20px'
											}}
										>
											Directly
										</span>
									</p>
									<p>
										Delivery method:
										<span
											style={{
												color: 'crimson',
												fontWeight: 500,
												fontSize: '20px'
											}}
										>
											Fast delivery
										</span>{' '}
									</p>
									<p>
										Promotion:
										<span
											style={{
												color: 'crimson',
												fontWeight: 500,
												fontSize: '20px'
											}}
										>
											No
										</span>{' '}
									</p>
									<h2>
										Total amount:
										<span
											style={{
												color: 'crimson',
												fontWeight: 700,
												fontSize: '24px'
											}}
										>
											$ {total}
										</span>
									</h2>
								</div>
							</div>
						</div>
						<div onClick={() => proceed()}>
							<Button
								text='
Order confirmation'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cart;
