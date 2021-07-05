import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import userAPI from './api/user.API';
import productAPI from './api/product.API';
import categoryAPI from './api/category.API';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
	const [token, setToken] = useState(false);

	useEffect(() => {
		const checkLogin = localStorage.getItem('firstLogin');

		if (checkLogin) {
			const refreshToken = async () => {
				const res = await axios.get('/user/refresh_token');
				// console.log(res);
				setToken(res.data.accesstoken);
				setTimeout(() => {
					refreshToken();
				}, 10 * 60 * 1000);
			};
			refreshToken();
		}
	}, []);

	const state = {
		token: [token, setToken],
		userAPI: userAPI(token),
		productAPI: productAPI(),
		categoryAPI: categoryAPI()
	};
	return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
