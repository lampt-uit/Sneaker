import React, { useState, useContext } from 'react';

import { GlobalState } from '../../../GlobalState';
import './Pagination.css';

function Pagination() {
	const state = useContext(GlobalState);
	const [pro] = state.userAPI.pro;
	const [page, setPage] = state.productAPI.page;

	const [itemsPage] = useState(8);

	const [pageNumberLimit] = useState(3);
	const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
	const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

	const pages = [];
	for (let i = 1; i <= Math.ceil(pro.length / itemsPage); i++) {
		pages.push(i);
	}
	// console.log(pages);

	const handleClick = (e) => {
		setPage(Number(e.target.value));
	};

	const handleNextBtn = () => {
		setPage(page + 1);
		if (page + 1 > maxPageNumberLimit) {
			setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
			setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
		}
	};

	const handlePrevBtn = () => {
		setPage(page - 1);
		if ((page - 1) % pageNumberLimit === 0) {
			setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
			setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
		}
	};
	return (
		<div>
			<ul className='page-number'>
				<li>
					<button
						disabled={page === pages[0] ? true : false}
						onClick={handlePrevBtn}
					>
						Prev
					</button>
				</li>
				{pages.map((_page) =>
					_page < maxPageNumberLimit + 1 && _page > minPageNumberLimit ? (
						<li
							key={_page}
							value={_page}
							onClick={handleClick}
							className={page === _page ? 'active' : null}
						>
							{_page}
						</li>
					) : null
				)}
				<li>
					<button
						disabled={page === pages[pages.length - 1] ? true : false}
						onClick={handleNextBtn}
					>
						Next
					</button>
				</li>
			</ul>
		</div>
	);
}

export default Pagination;
