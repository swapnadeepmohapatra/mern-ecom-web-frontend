import React, { useState, useEffect } from 'react';
import ImageHelper from './helper/ImageHelper';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import { Redirect, Link, withRouter } from 'react-router-dom';

function NewCard({ item, addToCart = true, removeFromCart = false, setReload = (f) => f, reload = undefined, num }) {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(item.count);

	const addThisToCart = () => {
		addItemToCart(item, () => setRedirect(true));
	};

	const showAddToCart = () => {
		return (
			<div className="col-12">
				<button
					onClick={() => {
						addThisToCart();
					}}
					className="btn btn-block btn-outline-success mt-2 mb-2"
				>
					Add to Cart
				</button>
			</div>
		);
	};

	const showRemoveFromCart = () => {
		return (
			<div className="col-12">
				<button
					onClick={() => {
						removeItemFromCart(item._id);
						setReload(!reload);
					}}
					className="btn btn-block btn-outline-danger mt-2 mb-2"
				>
					Remove from cart
				</button>
			</div>
		);
	};

	const getARedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};
	const getBg = (x) => {
		console.log(x);
		return { backgroundColor: '#E3E3E3' };
		// if (x === 0) {
		// 	return { backgroundColor: '#AAE4FF' };
		// }
		// if (x === 1) {
		// 	return { backgroundColor: '#E3E3E3' };
		// }
		// if (x === 2) {
		// 	return { backgroundColor: '#FFC0CB' };
		// }
		// if (x === 3) {
		// 	return { backgroundColor: '#F3D37A' };
		// }
		// return { backgroundColor: '#FFC0CB' };
	};
	return (
		<Link to={`/product/view/${item._id}`}>
			<button
				className="productCard"
				style={Object.assign(
					{
						borderWidth: 0,
						borderRadius: 15,
						height: '320px',
						width: '210px',
						textAlign: 'center',
					},
					getBg(num)
				)}
			>
				<h1 className="productName" style={{ fontWeight: 'bolder' }}>
					{item.name}
				</h1>
				<div className="card-body">
					{getARedirect(redirect)}
					<ImageHelper item={item} />
					<span style={{ fontWeight: 500, fontSize: 14 }}>
						$ {item.price}
						<span style={{ fontWeight: 300, fontSize: 10 }}>.00</span>
					</span>
					{/* <p className="btn btn-success rounded  btn-sm px-4">$ {item.price}</p> */}
					{/* <div className="row">
          {addToCart && showAddToCart()}
          {removeFromCart && showRemoveFromCart()}
        </div> */}
				</div>
			</button>
		</Link>
	);
}

export default withRouter(NewCard);
