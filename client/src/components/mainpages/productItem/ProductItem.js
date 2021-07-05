import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import Rating from '../utils/rating/Rating';
import './ProductItem.css';
function ProductItem({ product }) {
	const state = useContext(GlobalState);
	const addToCart = state.userAPI.addToCart;

	return (
		<div className='col l-3 m-6 c-12'>
			<div className='card-container'>
				{product.stock ? (
					<Link to={`/product/${product._id}`} className='card-link'>
						<img src={product.image[0]} alt='' className='card-link-img' />
					</Link>
				) : (
					<img src={product.image[0]} alt='' className='card-link-img-dis' />
				)}

				<div className='card-detail'>
					<div className='row1'>
						<div className='card-item_title'>{product.title}</div>
						<div className='card-item_price'>$ {product.price}</div>
					</div>

					<div className='row2'>
						<div className='reviews_1'>
							<Rating rating={product.rating} />
							<div className='reviews_qty'>{product.numReviews} reviews</div>
						</div>
						{product.stock ? (
							<Link
								to='#'
								onClick={() => addToCart(product._id)}
								className='buy'
							>
								Buy Now
							</Link>
						) : (
							<p style={{ color: 'crimson' }}>Out of stock</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductItem;
