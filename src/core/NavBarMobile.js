import React, { Fragment } from 'react';
import '../styles.css';
import { isAuthenticated, signout } from '../auth/helper';
import { Link, withRouter } from 'react-router-dom';
import { getCartItemsNumber } from './helper/cartHelper';

function NavBarMobile({ history }) {
	return (
		<div className="header">
			<Link style={{ alignSelf: 'center', marginLeft: '-25px' }} to="/" className="nav-link">
				<img
					style={{ height: '2rem', margin: 5, alignSelf: 'center' }}
					// src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/647px-Apple_logo_black.svg.png"
					src={require('./logo.png')}
					alt=""
				/>
			</Link>
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
			{isAuthenticated() ? (
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
						<Link to="/">My Account</Link>
						<Link to="/order">My Orders</Link>
						<a
							onClick={() => {
								signout(() => {
									history.push('/');
								});
							}}
						>
							Sign out
						</a>
					</div>
				</div>
			) : (
				<div
					className="dropdown"
					style={{
						alignSelf: 'center',
						marginRight: '0.5em',
					}}
				>
					<button className="dropbtn">
						<span>
							Hello, <b>Login</b>
						</span>
					</button>
					<div
						className="dropdown-content"
						style={{
							marginRight: '0.5em',
						}}
					>
						<Link to="/signup">Signup</Link>
						<Link to="/signin">Signin</Link>
					</div>
				</div>
			)}
		</div>
	);
}

export default withRouter(NavBarMobile);
