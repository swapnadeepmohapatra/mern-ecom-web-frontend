import React, { useEffect, useState } from 'react';
import '../styles.css';
import NavBar from './NavBar';
import Card from './Card';
import { getOrder } from './helper/orderHelper';
import StripeCheckout from './StripeCheckout';
import PaymentBraintree from './PaymentBraintree';
import { Redirect, Link } from 'react-router-dom';

function Order() {
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
				<h1>No orders!</h1>
				<Link to="/cart">Check your cart</Link>
				<p>Order items.</p>
				<Link to="/">
					<button className="transaction add-to-cart">Continue Shopping</button>
				</Link>
			</div>
		</div>
	);
}

export default Order;
