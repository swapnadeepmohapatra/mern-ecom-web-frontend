import React, { useEffect, useState } from 'react';
import { loadCartItems, emptyCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import { getToken, processPayment } from './helper/paymentHelper';
import { createOrder } from './helper/orderHelper';
import { isAuthenticated } from '../auth/helper';
import DropIn from 'braintree-web-drop-in-react';
const PaymentBraintree = ({ products, setReload = (f) => f, reload = undefined }) => {
	const [info, setInfo] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: '',
		instance: {},
	});

	const userId = isAuthenticated() && isAuthenticated().user._id;
	const token = isAuthenticated() && isAuthenticated().token;

	useEffect(() => {
		getMyToken(userId, token);
	}, []);

	const getMyToken = (userId, token) => {
		getToken(userId, token).then((info) => {
			if (info.error) {
				setInfo({ ...info, error: info.error });
			} else {
				const clientToken = info.clientToken;
				setInfo({ clientToken });
			}
		});
	};

	const getAmount = () => {
		let amount = 0;
		products.map((p) => {
			amount = amount + p.price;
		});
		return amount;
	};

	const onPurchase = () => {
		setInfo({ loading: true });
		let nonce;
		let getNonce = info.instance.requestPaymentMethod().then((data) => {
			nonce = data.nonce;
			const paymentData = {
				paymentMethodNonce: nonce,
				amount: getAmount(),
			};
			processPayment(userId, token, paymentData)
				.then((response) => {
					setInfo({ ...info, success: response.success, loading: false });
					console.log('PAYMENT SUCCESS');
					console.log('done 1');
					console.log(response);

					const orderData = {
						products: products,
						transaction_id: response.transaction.id,
						amount: response.transaction.amount,
					};
					console.log('done 2');

					createOrder(userId, token, orderData);
					console.log('done 3');

					emptyCart(() => {
						console.log('Emptied');
					});
					setReload(!reload);
				})
				.catch((error) => {
					setInfo({ loading: false, success: false });
					console.log('PAYMENT FAILED');
					console.log(error);
				});
		});
	};

	const showBraintreeComponent = () => {
		console.log(info);

		return (
			<div>
				{info.clientToken !== null && products && products.length > 0 ? (
					<div>
						<DropIn
							options={{ authorization: info.clientToken }}
							onInstance={(instance) => (info.instance = instance)}
						/>
						<button className="btn btn-block btn-success" onClick={onPurchase}>
							Buy
						</button>
					</div>
				) : (
					<div>
						<h3>Please Login</h3>
					</div>
				)}
			</div>
		);
	};

	return (
		<div>
			<h3>Test Payment Braintree</h3>
			{showBraintreeComponent()}
		</div>
	);
};

export default PaymentBraintree;
