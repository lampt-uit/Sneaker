import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import './OrderDetail.css';

function OrderDetails() {
	const params = useParams();
	const state = useContext(GlobalState);
	const [history] = state.userAPI.history;
	const [detailOrder, setDetailOrder] = useState([]);

	useEffect(() => {
		if (params.id)
			history.forEach((item) => {
				if (item._id === params.id) {
					setDetailOrder(item);
				}
			});
	}, [history, params.id]);
	if (detailOrder.length === 0) return null;

	const total = detailOrder.cart.reduce((prev, item) => {
		return prev + item.price * item.count;
	}, 0);

	const style = {
		color: !detailOrder.status ? 'red' : 'green'
	};

	return (
		<div className='history-detail mrt mrb'>
			<div className='grid wide'>
				<h1 className='history-title'>Order details</h1>
				<table>
					<tr>
						<th>Buyer's name</th>
						<th>Phone</th>
						<th>Delivery address</th>
						<th>Purchase date</th>
						<th>Order status</th>
					</tr>
					<tr>
						<td>{detailOrder.name}</td>
						<td>{detailOrder.phone}</td>
						<td>{detailOrder.address}</td>
						<td>{new Date(detailOrder.createdAt).toLocaleDateString()}</td>
						<td style={style}>{detailOrder.status ? 'Paid' : 'Unpaid'} </td>
					</tr>
				</table>

				<table style={{ marginTop: '60px' }}>
					<tr>
						<th>Product</th>
						<th>Title</th>
						<th>Price</th>
						<th>Amount</th>
						<th>Size</th>
					</tr>

					{detailOrder.cart.map((item) => (
						<tr style={{ backgroundColor: 'white' }} className='tr-boder'>
							<td>
								<img src={item.image[0]} alt='' />
							</td>
							<td className='td-name'>{item.title}</td>
							<td className='td-price'>$ {item.price}</td>
							<td>{item.count}</td>
							<td>{item.sizesl}</td>
						</tr>
					))}
					<tr>
						<td
							colSpan='4'
							style={{ fontSize: '20px', fontWeight: 700 }}
							className='heading-payment'
						>
							Total payment
						</td>
						<td style={{ fontSize: '22px', fontWeight: 700, color: 'crimson' }}>
							$ {total}
						</td>
					</tr>
				</table>
			</div>
		</div>
	);
}

export default OrderDetails;
