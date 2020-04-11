import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import { emptyCart, loadCartItems } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API, STRIPE_KEY } from '../backend';
import { createOrder } from './helper/orderHelper';

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
				name="Buy Gadgets"
				billingAddress
				shippingAddress
			>
				<button className="btn btn-success">Pay with Stripe</button>
			</StripeCheckoutButton>
		) : (
			<Link to="/signin">
				<button className="btn btn-success">Signin to buy</button>
			</Link>
		);
	};

	return (
		<div>
			<h3>Loading Stripe Checkout {getTotalAmount()}</h3>
			{showStripeButton()}
		</div>
	);
};

export default StripeCheckout;
