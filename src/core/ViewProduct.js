import React, { useEffect, useState } from 'react';
import { getProduct } from '../admin/helper/adminapicall';
import ReactImageMagnify from 'react-image-magnify';
import { addItemToCart } from './helper/cartHelper';
import { API } from '../backend';
import LoadImg from './giphy.webp';
import NavBar from './NavBar';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Redirect, withRouter } from 'react-router-dom';

const ViewProduct = ({ match }) => {
	const [loading, setLoading] = useState(true);
	const [values, setValues] = useState({
		_id: '',
		name: '',
		subTitle: '',
		descripiton: '',
		price: '',
		stock: '',
		category: '',
	});
	const [item, setItem] = useState();
	const [redirect, setRedirect] = useState(false);
	const { _id, name, subTitle, descripiton, price, stock, category } = values;

	useEffect(() => {
		preLoad(match.params.productId);
	}, []);

	const addThisToCart = () => {
		addItemToCart(item, () => {
			confirmAlert({
				title: 'Item Added to cart',
				message: 'Do you want to continue shopping ?',
				buttons: [
					{
						label: 'Go Back to Home',
						onClick: function () {
							setRedirect(false);
						},
					},
					{
						label: 'Go to Cart',
						onClick: function () {
							setRedirect(true);
						},
					},
				],
			});
		});
	};

	const imageUrl = _id ? `${API}product/photo/${_id}` : LoadImg;

	const preLoad = (productId) => {
		getProduct(productId).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setItem(data);
				console.log(data);

				setValues({
					...values,
					_id: data._id,
					name: data.name,
					subTitle: data.subTitle,
					descripiton: data.descripiton,
					price: data.price,
					category: data.category.name,
					stock: data.stock,
				});
				setLoading(false);
			}
		});
	};

	const getARedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div className="spinner-grow" role="status">
					<span className="sr-only">Loading...</span>
				</div>
				<div className="spinner-grow" role="status">
					<span className="sr-only">Loading...</span>
				</div>
				<div className="spinner-grow" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}
	return (
		<div className="container-fluid bg-white">
			<div className="jumbotron-fluid bg-white">
				<NavBar />
				{getARedirect(redirect)}
				<div className="row" style={{ marginTop: '85px', marginBottom: '50px' }}>
					<div className="col-xs-12 col-sm-6">
						<ReactImageMagnify
							{...{
								smallImage: {
									alt: '',
									isFluidWidth: true,
									src: imageUrl,
								},
								largeImage: {
									src: imageUrl,
									width: 1200,
									height: 1800,
								},
								isHintEnabled: true,
							}}
						/>
					</div>
					<div className="col-xs-12 col-sm-6">
						<h1 style={{ fontWeight: 'bolder', fontSize: '2em' }}>{subTitle}</h1>
						<p style={{ color: 'gray', fontWeight: 'normal', fontSize: '14px' }}>ID: {_id}</p>
						<br />
						<h2 style={{ fontSize: '22px' }}>$ {price}</h2>

						<h6
							style={{
								fontWeight: 'unset',
								color: '#999999',
								fontSize: '11px',
							}}
						>
							MRP incl. of all taxes
						</h6>
						<br />
						<br />
						<br />
						<button
							// className="transaction add-to-cart"
							className="button-grad"
							onClick={() => {
								addThisToCart();
							}}
						>
							Add to Cart
						</button>
						<br />
						<hr />
						<br />
						<h4>Product Specifications</h4>
						<br />
						<p
							dangerouslySetInnerHTML={{
								__html: descripiton,
							}}
						></p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(ViewProduct);
