import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import './AdminCustomer.css';
import { GlobalState } from '../../../GlobalState';
import Toast from '../utils/Toast/Toast';
import { showErrMsg } from '../utils/Notification/Notification';
import Button from '../utils/Button/Button';

function AdminCustomer() {
	const [callback, setCallback] = useState(false);
	const state = useContext(GlobalState);
	const [token] = state.token;
	const [userInfo] = state.userAPI.userInfo;
	const [users, setUsers] = useState([]);
	const [status, setStatus] = useState({ err: '', success: '' });
	const [user, setUser] = useState({
		name: '',
		email: '',
		address: '',
		phone: ''
	});
	const [id, setID] = useState('');
	const [onEdit, setOnEdit] = useState(false);

	useEffect(() => {
		if (token) {
			const getUsers = async () => {
				const res = await axios.get('/user/all', {
					headers: { Authorization: token }
				});
				setUsers(res.data);
			};

			getUsers();
		}
	}, [setUsers, token, callback]);

	const deleteUser = async (id) => {
		try {
			if (userInfo._id !== id) {
				if (window.confirm('Are you sure want to delete this user')) {
					const res = await axios.delete(`/user/delete/${id}`, {
						headers: { Authorization: token }
					});
					setStatus({ ...status, success: res.data.msg, err: '' });
					setCallback(!callback);
				}
			}
		} catch (error) {
			error.response.data.msg &&
				setStatus({ ...status, success: '', err: error.response.data.msg });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (!onEdit) {
				const res = await axios.post(
					'/user/create',
					{
						name: user.name,
						email: user.email,
						phone: user.phone,
						address: user.address
					},
					{
						headers: { Authorization: token }
					}
				);
				setStatus({ ...status, success: res.data.msg, err: '' });
				setCallback(!callback);
				setUser({
					name: '',
					email: '',
					address: '',
					phone: ''
				});
			} else {
				const res = await axios.patch(
					`/user/updateUser/${id}`,
					{
						name: user.name,
						email: user.email,
						phone: user.phone,
						address: user.address
					},
					{
						headers: { Authorization: token }
					}
				);
				setID('');
				setUser({
					name: '',
					email: '',
					address: '',
					phone: ''
				});
				setOnEdit(false);
				setStatus({ ...status, err: '', success: res.data.msg });
				setCallback(!callback);
			}
		} catch (error) {
			error.response.data.msg &&
				setStatus({ ...status, success: '', err: error.response.data.msg });
		}
	};

	const handleEdit = (item) => {
		setID(item._id);
		setUser({
			...user,
			name: item.name,
			email: item.email,
			phone: item.phone,
			address: item.address
		});
		setOnEdit(true);
	};

	const handleCheck = async (id, check) => {
		try {
			const res = await axios.patch(
				`/user/updateRole/${id}`,
				{
					role: check
				},
				{
					headers: { Authorization: token }
				}
			);
			setStatus({ ...status, err: '', success: res.data.msg });
			setCallback(!callback);
		} catch (error) {
			error.response.data.msg &&
				setStatus({ ...status, success: '', err: error.response.data.msg });
		}
	};

	return (
		<>
			{status.success && <Toast type='success' msg={status.success} />}
			<div className='admin-customers'>
				<h1>Customer Management</h1>
				<div className='grid wide'>
					<div className='row'>
						<div className='col l-3 '>
							<h3> {onEdit ? 'Edit' : 'Create'} Customer</h3>
							<form className='form' onSubmit={handleSubmit}>
								{status.err && showErrMsg(status.err)}
								<div className='form-group'>
									<label htmlFor='id' className='form-label'>
										ID
										<span
											style={{
												color: 'crimson',
												fontWeight: 500,
												fontSize: '12px'
											}}
										>
											{' '}
											* Auto generate
										</span>
									</label>
									<input
										type='text'
										id='id'
										className='form-control'
										disabled
										value={id}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='name' className='form-label'>
										Full Name
									</label>
									<input
										type='text'
										id='name'
										className='form-control'
										value={user.name}
										onChange={(e) =>
											setUser({
												...user,
												name: e.target.value,
												err: '',
												success: ''
											})
										}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='email' className='form-label'>
										Email
									</label>
									<input
										type='text'
										id='email'
										className='form-control'
										value={user.email}
										onChange={(e) =>
											setUser({
												...user,
												email: e.target.value,
												err: '',
												success: ''
											})
										}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='address' className='form-label'>
										Address
									</label>
									<input
										type='text'
										id='address'
										className='form-control'
										value={user.address}
										onChange={(e) =>
											setUser({
												...user,
												address: e.target.value,
												err: '',
												success: ''
											})
										}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='phone' className='form-label'>
										Phone
									</label>
									<input
										type='text'
										id='phone'
										className='form-control'
										value={user.phone}
										onChange={(e) =>
											setUser({
												...user,
												phone: e.target.value,
												err: '',
												success: ''
											})
										}
									/>
								</div>
								<Button text={onEdit ? 'Edit' : 'Create'} />
							</form>
						</div>
						<div className='col l-9'>
							<table>
								<thead>
									<tr style={{ fontSize: '12px' }}>
										<th>Ordinal numbers</th>
										<th>Code</th>
										<th>Full Name</th>
										<th>Email</th>
										<th>Role</th>

										<th>Option</th>
									</tr>
								</thead>
								<tbody>
									{users.map((item, index) => (
										<tr key={item._id}>
											<td style={{ fontWeight: '700' }}>
												{userInfo._id === item._id ? (
													<i
														style={{
															display: 'inline',
															fontSize: '10px',
															color: 'green'
														}}
														class='fas fa-circle'
													/>
												) : (
													''
												)}{' '}
												{index + 1}
											</td>
											<td>{item._id}</td>
											<td> {item.name}</td>
											<td>{item.email}</td>
											<td>
												{userInfo._id === item._id ? (
													<>
														<i
															style={{ color: 'green' }}
															class='fas fa-user-check'
														></i>
														&nbsp;
														<label htmlFor='isAdmin'>Admin</label>
													</>
												) : (
													<>
														<input
															type='checkbox'
															id='isAdmin'
															defaultChecked={item.role}
															onChange={(e) =>
																handleCheck(item._id, e.target.checked)
															}
														/>
														&nbsp;
														<label htmlFor='isAdmin'>isAdmin</label>
													</>
												)}
											</td>
											<td>
												<i
													class='fas fa-edit'
													onClick={() => handleEdit(item)}
												></i>
												&nbsp;
												<i
													class='fas fa-trash-alt'
													onClick={() => deleteUser(item._id)}
												></i>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AdminCustomer;
