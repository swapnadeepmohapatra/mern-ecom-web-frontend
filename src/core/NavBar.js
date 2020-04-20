import React from 'react';
import '../styles.css';
import { isAuthenticated } from '../auth/helper';
import { Link, withRouter } from 'react-router-dom';
import { getCartItemsNumber } from './helper/cartHelper';

function NavBar() {
	return (
		<div className="header">
			<Link style={{ alignSelf: 'center', marginLeft: '-25px' }} to="/main" className="nav-link">
				<img
					style={{ height: '2rem', margin: 5, alignSelf: 'center' }}
					// src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/647px-Apple_logo_black.svg.png"
					src={require('./logo.png')}
					alt=""
				/>
			</Link>
			<div
				style={{
					display: 'flex',
					margin: 'auto',
					fontSize: '14px',
					fontWeight: 300,
					border: 'none',
					marginLeft: '60px',
					flexDirection: 'row',
				}}
			>
				<input
					style={{ width: '30rem', fontSize: '14px', fontWeight: 300, border: 'none' }}
					type="text"
					placeholder="Search for products, brands and more..."
				/>
				<button style={{ backgroundColor: '#ffffff', border: 'none' }} type="submit">
					<svg width="20" height="20" viewBox="0 0 17 18" xmlns="http://www.w3.org/2000/svg">
						<g fill="#000000" fillRule="evenodd">
							<path d="m11.618 9.897l4.225 4.212c.092.092.101.232.02.313l-1.465 1.46c-.081.081-.221.072-.314-.02l-4.216-4.203"></path>
							<path d="m6.486 10.901c-2.42 0-4.381-1.956-4.381-4.368 0-2.413 1.961-4.369 4.381-4.369 2.42 0 4.381 1.956 4.381 4.369 0 2.413-1.961 4.368-4.381 4.368m0-10.835c-3.582 0-6.486 2.895-6.486 6.467 0 3.572 2.904 6.467 6.486 6.467 3.582 0 6.486-2.895 6.486-6.467 0-3.572-2.904-6.467-6.486-6.467"></path>
						</g>
					</svg>
				</button>
			</div>
			<div
				className="cart"
				style={{
					display: 'inlineBlock',
					marginRight: 'auto',
					alignSelf: 'center',
				}}
			>
				<Link className="nav-link" to="/cart" style={{ color: '#000000' }}>
					<img
						src="https://image.flaticon.com/icons/svg/626/626443.svg"
						alt=""
						height="20"
						style={{ marginRight: '5px', alignSelf: 'center' }}
					/>
					<span>Cart: </span>
					<span>{getCartItemsNumber()}</span>
				</Link>
			</div>
			<div
				className="dropdown"
				style={{
					alignSelf: 'center',
					marginLeft: '25px',
				}}
			>
				<button className="dropbtn">
					<img
						style={{
							borderRadius: 50,
							height: '2rem',
							width: '2rem',
							marginRight: '0.5em',
						}}
						src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
						alt="Profile Pic"
						height="30"
					/>
					<span>
						Hello, <b>{isAuthenticated().user.name}</b>
					</span>
				</button>
				<div className="dropdown-content">
					<Link>
						<a>My Account</a>
					</Link>
					<Link to="/order">
						<a>My Orders</a>
					</Link>
					<Link>
						<a>Sign out</a>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default withRouter(NavBar);
