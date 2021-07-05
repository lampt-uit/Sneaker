import React, { useContext } from 'react';
import axios from 'axios';

import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';
import Logo from '../../public/images/logo_vatino.png';
import './header.css';

const Header = () => {
	const state = useContext(GlobalState);
	// console.log(state);
	const [userInfo] = state.userAPI.userInfo;
	const [isLogged] = state.userAPI.isLogged;
	const [cart] = state.userAPI.cart;

	const [categories] = state.categoryAPI.categories;
	// console.log(categories);

	const [category, setCategory] = state.productAPI.category;
	const [search, setSearch] = state.productAPI.search;
	const handleReset = state.productAPI.handleReset;

	const handleLogout = async () => {
		try {
			await axios.get('/user/logout');
			localStorage.removeItem('firstLogin');
			localStorage.removeItem('dataCart');
			window.location.href = '/';
		} catch (error) {
			window.location.href = '/';
		}
	};
	// console.log(category);

	return (
		<div className='header'>
			<div className='header-top'>
				<ul>
					{isLogged ? (
						<li className='drop-nav'>
							<Link to='#' className='avatar'>
								<img src={userInfo.avatar} alt='/' />
								&nbsp;
								<span className='name'>
									{userInfo.name} <i className='fas fa-angle-down'></i>
								</span>
							</Link>
							<ul className='dropdown'>
								<li>
									<Link to='/profile'>Information</Link>
								</li>
								{userInfo.role ? (
									<>
										<li>
											<Link to='/history'>Order</Link>
										</li>
										<li>
											<Link to='/admin/products'>Products Management</Link>
										</li>
										<li>
											<Link to='/admin/payments'>Orders Management</Link>
										</li>
										<li>
											<Link to='/admin/categories'>Categories Management</Link>
										</li>
										<li>
											<Link to='/admin/customers'>Users Management</Link>
										</li>
									</>
								) : (
									<li>
										<Link to='/history'>Orders</Link>
									</li>
								)}

								<li>
									<Link to='/logout' onClick={handleLogout}>
										Logout
									</Link>
								</li>
							</ul>
						</li>
					) : (
						<>
							{' '}
							<li>
								<Link to='/login'>Login</Link>
							</li>
							<li>
								<Link to='/register'>Register</Link>
							</li>
						</>
					)}
				</ul>
			</div>
			<div className='header-bottom'>
				<Link
					to='/'
					className='header-bottom_logo'
					onClick={() => handleReset()}
				>
					{userInfo.role ? (
						<h1 style={{ marginLeft: '20px' }}>ADMIN</h1>
					) : (
						<img src={Logo} alt='' width='100' />
					)}
				</Link>
				<div className='header-bottom_nav'>
					<ul>
						{categories.map((category_) => (
							<Link to='/product'>
								<li
									style={{
										borderBottom:
											category === `category=${category_._id}`
												? '3px solid #636e72'
												: ''
									}}
									key={category._id}
									onClick={() => setCategory(`category=${category_._id}`)}
								>
									<h4
										style={{
											fontWeight:
												category === `category=${category_._id}` ? '700' : ''
										}}
									>
										{category_.name}
									</h4>
								</li>
							</Link>
						))}
					</ul>
				</div>
				<div className='header-bottom_search'>
					<div className='form-input'>
						<input
							type='text'
							placeholder='Search'
							value={search}
							onChange={(e) => setSearch(e.target.value.toLowerCase())}
						/>
						<Link to='/product'>
							<i className='fas fa-search'></i>
						</Link>
					</div>
					<Link to='/cart' className='icon-cart'>
						<i className='fas fa-shopping-cart'></i>
						<div className='cart__total'>
							<span>{cart.length}</span>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
