import React, { useEffect, useState } from 'react';
import '../styles.css';
import { getProducts } from './helper/coreapicalls';
import NewCard from './NewCard';
import { withRouter } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { useMediaQuery } from 'react-responsive';
import NavBarMobile from './NavBarMobile';

function NewHome() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-device-width: 1224px)',
	});
	const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' });
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)',
	});
	const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
	const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

	const loadAllProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				setError(data.error);
				console.log(data.error);
			} else {
				setLoading(false);
				setProducts(data);
			}
		});
	};

	useEffect(() => {
		loadAllProducts();
	}, []);

	const renderProducts = (products) => {
		products.map((item, index) => {
			return (
				<div key={index} style={{ margin: '1rem' }}>
					<NewCard item={item} num={index} />
				</div>
			);
		});
		console.log(isDesktopOrLaptop);
		console.log(isTabletOrMobile);
	};

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div className="spinner-grow " role="status">
					<span className="sr-only">Loading...</span>
				</div>
				<div className="spinner-grow " role="status">
					<span className="sr-only">Loading...</span>
				</div>
				<div className="spinner-grow " role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}

	// if (isTabletOrMobile) {
	// 	return (
	// 		<div
	// 			style={{
	// 				display: 'flex',
	// 				backgroundColor: '#ffffff',
	// 			}}
	// 		>
	// 			<NavBar />
	// 			<div
	// 				style={{
	// 					backgroundColor: '#ffffff',
	// 					marginTop: '75px',
	// 				}}
	// 			>
	// 				<div style={{ marginLeft: '10px', flexDirection: 'column' }}>
	// 					<h1
	// 						style={{
	// 							fontWeight: 'bolder',
	// 							marginTop: '5px',
	// 							fontSize: '2rem',
	// 						}}
	// 					>
	// 						Popular
	// 					</h1>
	// 				</div>

	// 				<div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
	// 					<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
	// 						{products &&
	// 							products.map((item, index) => {
	// 								return (
	// 									<div key={index} style={{ margin: '1rem' }}>
	// 										<NewCard item={item} num={index} />
	// 									</div>
	// 								);
	// 							})}
	// 						{renderProducts(products)}
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<div
			style={{
				display: 'flex',
				backgroundColor: '#ffffff',
			}}
		>
			<NavBar />
			<div
				style={{
					backgroundColor: '#ffffff',
					marginTop: '75px',
				}}
			>
				<div style={{ marginLeft: '10px', flexDirection: 'column' }}>
					<h1
						style={{
							fontWeight: 'bolder',
							marginTop: '5px',
							fontSize: '2rem',
						}}
					>
						Popular
					</h1>

					<div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
						<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
							{products &&
								products.map((item, index) => {
									return (
										<div key={index} style={{ margin: '1rem' }}>
											<NewCard item={item} num={index} />
										</div>
									);
								})}
							{renderProducts(products)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default withRouter(NewHome);
