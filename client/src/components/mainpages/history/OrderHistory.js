import React, { useEffect, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import './OrderHistory.css';
import axios from 'axios';

function OrderHistory() {
	const state = useContext(GlobalState);
	const [history, setHistory] = state.userAPI.history;
	const [token] = state.token;
	const [userInfo] = state.userAPI.userInfo;
	console.log(userInfo);

	useEffect(() => {
		if (token) {
			const getHistory = async () => {
				if (userInfo.role) {
					const res = await axios.get('/api/payments', {
						headers: { Authorization: token }
					});
					setHistory(res.data);
				} else {
					const res = await axios.get('/user/history', {
						headers: { Authorization: token }
					});
					setHistory(res.data);
				}
			};
			getHistory();
		}
	}, [token, setHistory, userInfo.role]);

	if (history.length === 0)
		return (
			<h2
				style={{
					textAlign: 'center',
					fontSize: '5rem',
					paddingTop: '147px',
					marginBottom: '114px'
				}}
			>
				You are not buying
			</h2>
		);

	return (
		<div className='history mrt mrb'>
			<div className='grid wide'>
				<div className='row'>
					<div className='col l-12'>
						<div className='history-page'>
							<h2>ORDER HISTORY</h2>
							<h4>You have been {history.length} orders</h4>
							<table>
								<thead>
									<tr>
										<th>Ordinal numbers</th>
										<th>Code</th>
										<th>Purchase date</th>
										<th>Detail</th>
									</tr>
								</thead>

								{history.map((items, index) => (
									<tr key={items._id}>
										<td>{index + 1}</td>
										<td>{items._id}</td>
										<td>{new Date(items.createdAt).toLocaleDateString()}</td>
										<td>
											<Link to={`/history/${items._id}`}>View</Link>
										</td>
									</tr>
								))}
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrderHistory;
