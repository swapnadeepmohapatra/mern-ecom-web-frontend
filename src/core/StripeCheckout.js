import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import { emptyCart, loadCartItems } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API, STRIPE_KEY } from '../backend';
import { createOrder } from './helper/orderHelper';
import '../styles.css';

const StripeCheckout = ({ products, setReload = (f) => f, reload = undefined }) => {
	const [data, setData] = useState({
		loading: false,
		success: false,
		error: '',
		address: '',
	});

	const accToken = isAuthenticated() && isAuthenticated().token;
	const userId = isAuthenticated() && isAuthenticated().user._id;

	const getTotalAmount = () => {
		let amount = 0;
		products.map((p) => {
			amount = amount + p.price;
		});
		return amount;
	};

	const makePayment = (token) => {
		const body = {
			token,
			products,
		};

		const headers = {
			'Content-Type': 'application/json',
		};

		return fetch(`${API}payment/stripe`, {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('RSP', res);
				const orderData = {
					products: products,
					transaction_id: res.id,
					amount: res.amount / 100,
					user: userId,
				};

				createOrder(userId, accToken, orderData);
				emptyCart(() => {
					console.log('cart is empty');
				});
				setReload(!reload);
			})
			.catch((error) => console.log(error));
	};

	const showStripeButton = () => {
		return isAuthenticated() ? (
			<StripeCheckoutButton
				stripeKey={STRIPE_KEY}
				token={makePayment}
				amount={getTotalAmount() * 100}
				name={`Buy ${products[0].name}`}
				billingAddress
				shippingAddress
			>
				{/* <button className="stripeBtn">Proceed to Buy</button> */}
				<button className="transaction add-to-cart">Proceed to Buy</button>
			</StripeCheckoutButton>
		) : (
			<Link to="/signin">
				<button className="transaction add-to-cart">Signin to buy</button>
				{/* <button className="stripeBtn">Signin to buy</button> */}
			</Link>
		);
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<div className="stripeHolder">
				<h5>
					Subtotal ({products.length} items): <span style={{ fontSize: 14 }}>$</span>
					{getTotalAmount()
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
				</h5>
				{showStripeButton()}
			</div>
		</div>
	);
};

export default StripeCheckout;
