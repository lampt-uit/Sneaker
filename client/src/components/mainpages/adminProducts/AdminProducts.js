import React, { useContext, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

import './AdminProducts.css';
import { GlobalState } from '../../../GlobalState';
import Toast from '../utils/Toast/Toast';
import Button from '../utils/Button/Button';
import { showErrMsg } from '../utils/Notification/Notification';

function AdminProducts() {
	const state = useContext(GlobalState);
	const [token] = state.token;
	const [pro] = state.userAPI.pro;
	const [status, setStatus] = useState({ err: '', success: '' });
	const [callback2, setCallback2] = state.userAPI.callback2;
	const [categories] = state.categoryAPI.categories;
	const [product, setProduct] = useState({
		product_id: '',
		title: '',
		description: '',
		price: '',
		stock: '',
		category: '',
		image: ''
	});
	const [files, setFiles] = useState();
	const [id, setID] = useState('');
	const [onEdit, setOnEdit] = useState(false);

	const handleDelete = async (id) => {
		try {
			const res = await axios.delete(`/api/product/${id}`);
			if (window.confirm('Are you sure want to delete this product')) {
				setStatus({ ...status, success: res.data.msg, err: '' });
				setCallback2(!callback2);
			}
		} catch (error) {
			error.response.data.msg &&
				setStatus({ ...status, success: '', err: error.response.data.msg });
		}
	};
	console.log(status);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (!onEdit) {
				const data = new FormData();
				_.forEach(files, (file) => {
					data.append('image', file);
				});
				data.append('product_id', product.product_id);
				data.append('title', product.title);
				data.append('description', product.description);
				data.append('category', product.category);
				data.append('stock', product.stock);
				data.append('price', product.price);
				const res = await axios.post('/api/products', data, {
					headers: {
						Authorization: token
					}
				});
				setStatus({ ...status, success: res.data.msg, err: '' });
				setCallback2(!callback2);
				setProduct({
					product_id: '',
					title: '',
					description: '',
					price: '',
					stock: '',
					category: '',
					image: ''
				});
			} else {
				const data = new FormData();
				_.forEach(files, (file) => {
					data.append('image', file);
				});
				data.append('title', product.title);
				data.append('description', product.description);
				data.append('category', product.category);
				data.append('stock', product.stock);
				data.append('price', product.price);
				const res = await axios.patch(`/api/product/${id}`, data, {
					headers: {
						Authorization: token
					}
				});
				setID('');
				setOnEdit(false);
				setStatus({ ...status, success: res.data.msg, err: '' });
				setCallback2(!callback2);
				setProduct({
					product_id: '',
					title: '',
					description: '',
					price: '',
					stock: '',
					category: '',
					image: ''
				});
			}
		} catch (error) {
			error.response.data.msg &&
				setStatus({ ...status, success: '', err: error.response.data.msg });
		}
	};

	const handleEdit = (item) => {
		setID(item._id);
		setProduct({
			...product,
			product_id: item.product_id,
			title: item.title,
			description: item.description,
			price: item.price,
			stock: item.product_id,
			image: item.image,
			category: item.category
		});
		setOnEdit(true);
	};

	return (
		<>
			{status.success && <Toast type='success' msg={status.success} />}
			<div className='admin-products'>
				<h1>Product Management</h1>
				<div className='grid wide'>
					<div className='row'>
						<div className='col l-4'>
							<h3 style={{ textAlign: 'center' }}>
								{' '}
								{onEdit ? 'Edit' : 'Create'} Product
							</h3>
							<form className='form' onSubmit={handleSubmit}>
								{status.err && showErrMsg(status.err)}

								<div className='form-group'>
									<label htmlFor='productid' className='form-label'>
										Product ID
									</label>
									{onEdit ? (
										<input
											type='number'
											id='productid'
											className='form-control'
											value={product.product_id}
											disabled
										/>
									) : (
										<input
											type='number'
											id='productid'
											className='form-control'
											value={product.product_id}
											onChange={(e) =>
												setProduct({
													...product,
													product_id: e.target.value
												})
											}
										/>
									)}
								</div>
								<div className='form-group'>
									<label htmlFor='title' className='form-label'>
										Title
									</label>
									<input
										type='text'
										id='title'
										className='form-control'
										value={product.title}
										onChange={(e) =>
											setProduct({
												...product,
												title: e.target.value
											})
										}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='description' className='form-label'>
										Description
									</label>
									<textarea
										type='text'
										id='description'
										rows='7'
										value={product.description}
										onChange={(e) =>
											setProduct({
												...product,

												description: e.target.value
											})
										}
									/>
								</div>
								<div className='row'>
									<div className='col l-4'>
										<div className='form-group'>
											<label htmlFor='price' className='form-label'>
												Price
											</label>
											<input
												type='number'
												id='price'
												className='form-control'
												value={product.price}
												onChange={(e) =>
													setProduct({
														...product,
														price: e.target.value
													})
												}
											/>
										</div>
									</div>
									<div className='col l-4'>
										{' '}
										<div className='form-group'>
											<label htmlFor='stock' className='form-label'>
												Stock
											</label>
											<input
												type='number'
												id='stock'
												className='form-control'
												value={product.stock}
												onChange={(e) =>
													setProduct({
														...product,

														stock: e.target.value
													})
												}
											/>
										</div>
									</div>

									<div className='col l-4'>
										<div className='form-group'>
											<label htmlFor='category' className='form-label'>
												Category
											</label>
											<select
												value={product.category}
												name='category'
												style={{ outline: 'none', height: '46px' }}
												onChange={(e) =>
													setProduct({
														...product,

														category: e.target.value
													})
												}
											>
												<option value=''>Please select category </option>
												{categories.map((category) => (
													<option value={category._id} key={category._id}>
														{category.name}
													</option>
												))}
											</select>
										</div>
									</div>
								</div>
								<div className='form-group'>
									<label htmlFor='image' className='form-label'>
										Image <span style={{ color: 'crimson' }}> *</span>
									</label>

									<input
										type='file'
										name='image'
										accept='image/*'
										multiple
										onChange={(e) => setFiles(e.target.files)}
									/>
								</div>
								<img
									src={product.image[0]}
									alt=''
									width='150px'
									height='150px'
									style={{ marginRight: '10px', border: '1px solid #8395a7' }}
								/>
								<img
									src={product.image[1]}
									alt=''
									width='100px'
									height='100px'
									style={{ marginRight: '10px', border: '1px solid #8395a7' }}
								/>

								<Button text={onEdit ? 'Edit' : 'Create'} />
							</form>
						</div>
						<div className='col l-8'>
							<table>
								<thead>
									<tr>
										<th>Ordinal numbers</th>
										<th>Title</th>
										<th>Price</th>
										<th>In Stock</th>
										<th>Option</th>
									</tr>
								</thead>
								<tbody>
									{pro.map((item, index) => (
										<tr key={item._id}>
											<td style={{ fontWeight: '700' }}>{index + 1}</td>
											<td style={{ textTransform: 'uppercase' }}>
												{item.title}
											</td>
											<td style={{ color: 'crimson', fontWeight: '700' }}>
												{' '}
												$ {item.price}
											</td>
											<td>{item.stock}</td>
											<td>
												<i
													class='fas fa-edit'
													onClick={() => handleEdit(item)}
												></i>
												&nbsp;
												<i
													class='fas fa-trash-alt'
													onClick={() => handleDelete(item._id)}
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

export default AdminProducts;
