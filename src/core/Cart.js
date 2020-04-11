import React, { useEffect, useState } from 'react';
import '../styles.css';
import NavBar from './NavBar';
import Card from './Card';
import { loadCartItems } from './helper/cartHelper';
import StripeCheckout from './StripeCheckout';
import PaymentBraintree from './PaymentBraintree';

function Cart() {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);

	const loadAllProductsOfCart = (products) => {
		return (
			<div>
				<h2>This section is to load products</h2>
				{products.map((product, index) => (
					<div key={index} className="col-4 mb-4">
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

	return (
		<div>
			<NavBar />
			<div className="container-fluid  text-center" style={{ marginTop: '75px' }}>
				<div className="row">
					<div className="col-6">
						{products && products.length > 0 ? (
							loadAllProductsOfCart(products)
						) : (
							<h4>No Items in the card</h4>
						)}
					</div>
					<div className="col-6">
						{/* <PaymentBraintree
              products={products}
              setReload={setReload}
              reload={reload}
            /> */}
						{products && products.length > 0 ? (
							<StripeCheckout products={products} setReload={setReload} reload={reload} />
						) : (
							<h4></h4>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cart;
