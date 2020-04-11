import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../admin/helper/adminapicall';
import '../styles.css';

function SideBar() {
	const [categories, setCategories] = useState([]);

	const preLoad = () => {
		getAllCategories().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setCategories(data);
			}
		});
	};

	useEffect(() => {
		preLoad();
	}, []);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', marginTop: '5px' }}>
			<h1 style={{ fontWeight: 'bolder', fontSize: '2rem' }}>Categories</h1>
			<div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '5px' }}>
				<ul style={{ listStyleType: 'none' }}>
					{categories.map((cate, index) => {
						return (
							<li key={index}>
								<a className="d-flex align-items-center">
									<span
										style={{
											fontSize: '20px',
											marginLeft: '-1rem',
											fontWeight: 'lighter',
										}}
									>
										{cate.name}
									</span>
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default SideBar;
