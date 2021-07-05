import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { GlobalState } from '../../../GlobalState';
import './Product.css';
import ProductItem from '../productItem/ProductItem';
import Pagination from '../pagination/Pagination';
function Product() {
	const state = useContext(GlobalState);
	const history = useHistory();
	const [products] = state.productAPI.products;
	// const [category, setCategory] = state.productAPI.category;
	const [sort, setSort] = state.productAPI.sort;
	// const [search, setSearch] = state.productAPI.search;

	// console.log(products);
	const handleReset = state.productAPI.handleReset;

	return (
		<>
			<div className='home_product mrt mrb'>
				<div className='grid wide'>
					<div className='breadcrumb'>
						<Link to='#' onClick={() => history.goBack()}>
							<i className='fas fa-arrow-left'></i>
							Back
						</Link>
						<Link to='/' onClick={() => handleReset()}>
							Home
						</Link>
					</div>
					<div className='reset_sort_search'>
						<h2>All Products </h2>

						<button onClick={() => handleReset()} title='Reset Sort And Search'>
							<i class='fas fa-sync-alt'></i>
						</button>
					</div>
					<div className='home_filter'>
						<span className='home_filter_label'>Sort by </span>
						<button
							style={{
								border: sort === 'sort=updatedAt' ? '1px solid black' : ''
							}}
							className='home_filter-button'
							onClick={() => setSort('sort=updatedAt')}
						>
							Newest
						</button>
						<button
							style={{
								border: sort === 'sort=-sold' ? '1px solid black' : ''
							}}
							className='home_filter-button'
							onClick={() => setSort('sort=-sold')}
						>
							Selling
						</button>
						<button
							style={{
								border: sort === 'sort=-numReviews' ? '1px solid black' : ''
							}}
							className='home_filter-button'
							onClick={() => setSort('sort=-numReviews')}
						>
							Popular
						</button>

						<select
							className='select_price'
							value={sort}
							onChange={(e) => setSort(e.target.value)}
						>
							<option value=''>Price</option>
							<option value='sort=-price'>High - Low</option>
							<option value='sort=price'>Low - High</option>
						</select>
					</div>
					<div className='row sm-gutter'>
						{products.map((product) => {
							return (
								<ProductItem key={product._id} product={product}></ProductItem>
							);
						})}
					</div>
				</div>
			</div>

			{/* {products.length >= 12 && <Pagination />} */}
			<Pagination />
		</>
	);
}

export default Product;
