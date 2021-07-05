export const isEmpty = (value) => {
	if (!value) return true;
	return false;
};

export const isEmail = (email) => {
	const re =
		// eslint-disable-next-line
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

export const isPhone = (phone) => {
	const re =
		// eslint-disable-next-line
		/\+?([\d|\(][\h|\(\d{3}\)|\.|\-|\d]{4,}\d)/;
	return re.test(phone);
};
