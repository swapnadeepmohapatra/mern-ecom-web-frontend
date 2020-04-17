import React, { useState, useEffect } from 'react';
import ImageHelper from './helper/ImageHelper';
import { removeItemFromCart } from './helper/cartHelper';

function Card({ item, removeFromCart = false, setReload = (f) => f, reload = undefined }) {
	const [count, setCount] = useState(item.count);

	const showRemoveFromCart = () => {
		return (
			<div>
				<button
					onClick={() => {
						removeItemFromCart(item._id);
						setReload(!reload);
					}}
					className="transaction delete-from-cart"
				>
					Remove from cart
				</button>
			</div>
		);
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-10 mt-3">
					<div className="card" style={{ backgroundColor: '#aae4ff', borderRadius: '15px', border: 'none' }}>
						<div className="card-horizontal">
							<div className="card-body" style={{ display: 'flex', flexDirection: 'row' }}>
								<ImageHelper item={item} />
								<div>
									<h4 style={{ fontWeight: 'bolder', fontSize: '2em', textAlign: 'start' }}>
										{item.subTitle}
									</h4>
									<p
										style={{
											color: 'gray',
											fontWeight: 'normal',
											fontSize: '14px',
											textAlign: 'start',
										}}
									>
										ID: {item._id}
									</p>
									<br />
									<h2 style={{ fontSize: '22px', textAlign: 'start' }}>$ {item.price}</h2>
									<span style={{ textAlign: 'start' }}>{showRemoveFromCart()}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		// <div style={{ display: 'flex', flexDirection: 'row', height: '200px' }}>
		// 	<ImageHelper item={item} />

		// </div>
		// <div className="card text-black bg-white border border-info ">
		// 	<div className="card-header lead">{item.name}</div>
		// 	<div className="card-body">
		// 		<ImageHelper item={item} />
		// 		<p className="lead bg-info font-weight-light text-wrap text-white">{item.descripiton}</p>
		// 		<p className="btn btn-success rounded  btn-sm px-4">₹ {item.price}</p>
		// 		<div className="row">{removeFromCart && showRemoveFromCart()}</div>
		// 	</div>
		// </div>
	);
}

export default Card;
