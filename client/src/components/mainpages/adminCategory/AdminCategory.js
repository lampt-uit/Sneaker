import React, { useState, useContext } from 'react';
import axios from 'axios';

import './AdminCategory.css';
import { GlobalState } from '../../../GlobalState';
import Button from '../utils/Button/Button';
import { showErrMsg } from '../utils/Notification/Notification';
import Toast from '../utils/Toast/Toast';

function AdminCategory() {
	const state = useContext(GlobalState);
	const [categories] = state.categoryAPI.categories;
	const [token] = state.token;
	const [category, setCategory] = useState('');
	const [callback, setCallback] = state.categoryAPI.callback;
	const [onEdit, setOnEdit] = useState(false);
	const [id, setID] = useState('');
	const [status, setStatus] = useState({ err: '', success: '' });
	const { err, success } = status;

	const createCategory = async (e) => {
		e.preventDefault();
		try {
			if (!onEdit) {
				const res = await axios.post(
					'/api/category',
					{
						name: category
					},
					{
						headers: { Authorization: token }
					}
				);
				setStatus({ ...status, err: '', success: res.data.msg });
				setCallback(!callback);
			} else {
				const res = await axios.put(
					`/api/category/${id}`,
					{ name: category },
					{
						headers: { Authorization: token }
					}
				);
				setID('');
				setCategory('');
				setOnEdit(false);
				setStatus({ ...status, err: '', success: res.data.msg });
				setCallback(!callback);
			}
		} catch (error) {
			error.response.data.msg &&
				setStatus({ ...status, success: '', err: error.response.data.msg });
		}
	};
	const deleteCategory = async (id) => {
		try {
			if (window.confirm('Do you want to delete this category ? ')) {
				const res = await axios.delete(`/api/category/${id}`, {
					headers: { Authorization: token }
				});
				setStatus({ ...status, err: '', success: res.data.msg });
				setCallback(!callback);
			}
		} catch (error) {
			error.response.data.msg &&
				setStatus({ ...status, success: '', err: error.response.data.msg });
		}
	};

	const editCategory = (id, name) => {
		setID(id);
		setCategory(name);
		setOnEdit(true);
	};
	return (
		<>
			{err && <Toast type='err' msg={err} />}
			{success && <Toast type='success' msg={success} />}

			<div className='admin-category'>
				<h1>Category Management</h1>
				<div className='grid wide'>
					<div className='row'>
						<div className='col l-4'>
							<form onSubmit={createCategory} className='form'>
								{err && showErrMsg(err)}

								<div className='form-group'>
									<label htmlFor='category' className='form-label'>
										Category
									</label>
									<input
										type='text'
										name='category'
										required
										value={category}
										onChange={(e) => setCategory(e.target.value)}
										class='form-control'
									/>
								</div>

								<Button text={onEdit ? 'Edit' : 'Create'} />
							</form>
						</div>
						<div className='col l-8'>
							<table>
								<thead>
									<tr style={{ fontSize: '12px' }}>
										<th>Ordinal numbers</th>
										<th>Code</th>
										<th>Title</th>
										<th>Option</th>
									</tr>
								</thead>
								<tbody>
									{categories.map((item, index) => (
										<tr key={item._id}>
											<td style={{ fontWeight: '700' }}>{index + 1}</td>
											<td>{item._id}</td>
											<td style={{ fontWeight: '700' }}> {item.name}</td>

											<td>
												<i
													class='fas fa-edit'
													onClick={() => editCategory(item._id, item.name)}
												></i>
												&nbsp;
												<i
													class='fas fa-trash-alt'
													onClick={() => deleteCategory(item._id)}
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

export default AdminCategory;
