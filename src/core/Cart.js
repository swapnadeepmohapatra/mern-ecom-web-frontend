import React, { useEffect, useState } from 'react';
import '../styles.css';
import NavBar from './NavBar';
import Card from './Card';
import { loadCartItems } from './helper/cartHelper';
import StripeCheckout from './StripeCheckout';
import PaymentBraintree from './PaymentBraintree';
import { Redirect, Link } from 'react-router-dom';

function Cart() {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);

	const loadAllProductsOfCart = (products) => {
		return (
			<div>
				<h2>Products in the Cart</h2>
				{products.map((product, index) => (
					<div key={index}>
						<Card
							item={product}
							removeFromCart={true}
							addToCart={false}
							setReload={setReload}
							reload={reload}
						/>
					</div>
				))}
			</div>
		);
	};

	useEffect(() => {
		setProducts(loadCartItems());
		console.log(loadCartItems());
	}, [reload]);

	if (products.length === 0) {
		return (
			<div>
				<NavBar />
				<div
					style={{
						display: 'flex',
						height: '100vh',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<h1>Your cart is empty!</h1>
					<Link to="/orders">Check your orders</Link>
					<p>Add items to it now.</p>
					<Link to="/main" className="button-grad">
						Continue Shopping
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div>
			<NavBar />
			<div className="container-fluid text-center" style={{ marginTop: '75px' }}>
				{products && products.length > 0 ? loadAllProductsOfCart(products) : <h4>No Items in the card</h4>}
			</div>
		</div>
	);
}

export default Cart;
{
	/* {products && products.length > 0 ? (
							<StripeCheckout products={products} setReload={setReload} reload={reload} />
						) : (
							<h4></h4>
						)} */
}
{
	/* <PaymentBraintree
              products={products}
              setReload={setReload}
              reload={reload}
            /> */
}
