import React from 'react';
import Home from './home/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Product from './product/Product';
import DetailProduct from './detailProduct/DetailProduct';
import { Switch, Route } from 'react-router-dom';
// import NotFound from './utils/Not_Found/NotFound';
import Cart from './cart/Cart';
import Profile from './profile/Profile';
import History from './history/OrderHistory';
import HistoryDetail from './history/OrderDetails';
import ForgotPassword from './forgotPassword/ForgotPassword';
import ResetPassword from './ResetPassword/ResetPassword';
import AdminProducts from './adminProducts/AdminProducts';
import AdminPayments from './adminPayments/AdminPayments';
import AdminCustomers from './adminCustomer/AdminCustomer.js';
import AdminCategory from './adminCategory/AdminCategory';

const Pages = () => {
	return (
		<Switch>
			<Route path='/' exact component={Home}></Route>
			<Route path='/login' exact component={Login}></Route>
			<Route path='/register' exact component={Register}></Route>
			<Route path='/product' exact component={Product}></Route>
			<Route path='/product/:id' exact component={DetailProduct}></Route>
			<Route path='/cart' exact component={Cart}></Route>
			<Route path='/profile' exact component={Profile}></Route>
			<Route path='/history' exact component={History}></Route>
			<Route path='/history/:id' exact component={HistoryDetail}></Route>
			<Route path='/reset/:token' exact component={ForgotPassword}></Route>
			<Route path='/forgot' exact component={ResetPassword}></Route>
			<Route path='/admin/products' exact component={AdminProducts}></Route>
			<Route path='/admin/payments' exact component={AdminPayments}></Route>
			<Route path='/admin/customers' exact component={AdminCustomers}></Route>
			<Route path='/admin/categories' exact component={AdminCategory}></Route>

			{/* <Route path='*' exact component={NotFound}></Route> */}
		</Switch>
	);
};

export default Pages;
