import React from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import { getAllOrders, deleteProduct } from './helper/adminapicall';

const Orders = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const { user, token } = isAuthenticated();

	useEffect(() => {
		preLoad();
	}, []);

	const preLoad = () => {
		getAllOrders(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
				setLoading(false);
			} else {
				console.log(data);

				setProducts(data);
				setLoading(false);
			}
		});
	};

	const deleteThisProduct = (productId) => {
		setLoading(true);
		deleteProduct(productId, user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				preLoad();
			}
		});
	};

	const goBack = () => (
		<div className="mt-5">
			<Link className="btn btn-sm btn-danger mb-3" to="/admin/dashboard">
				{'<-'}Admin Home
			</Link>
		</div>
	);

	const loadingMessage = () => {
		return loading && <div className="alert alert-info loading">Loading</div>;
	};

	const productsList = () => {
		return (
			<div>
				<div className="row">
					<div className="col-12 text-left">
						<h2 className="text-center text-black my-3">Total {products.length} orders</h2>

						{products.map((item, index) => {
							return (
								<div key={index} className="row text-center mb-2 ">
									<div className="col-4">
										<h3 className="text-black text-left">{item.status}</h3>
									</div>
									<div className="col-4">
										<Link className="btn btn-success" to={`/admin/product/update/${item._id}`}>
											<span className="">Update</span>
										</Link>
									</div>
									<div className="col-4">
										<button
											onClick={() => {
												deleteThisProduct(item._id);
											}}
											className="btn btn-danger"
										>
											Delete
										</button>
									</div>
								</div>
							);
						})}

						{goBack()}
					</div>
				</div>
			</div>
		);
	};

	return (
		<Base title="Manage Products" description="Modify your existing products here!">
			{loadingMessage()}
			{!loading && productsList()}
		</Base>
	);
};

export default Orders;
