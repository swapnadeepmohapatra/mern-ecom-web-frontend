import React from 'react';
import Menu from './Menu';

const Base = ({
	title = 'My Title',
	description = 'My Description',
	className = 'bg-light text-black p-4',
	children,
}) => {
	return (
		<div>
			<Menu />
			<div className="container-fluid  text-center" style={{ marginBottom: 200 }}>
				{/* <div className="jumbotron text-black bg-light text-center"> */}
				<h2 className="display-4">{title}</h2>
				<p className="lead">{description}</p>
				{/* </div> */}
				<div className={className}>{children}</div>
			</div>
			<footer className="footer bg-light mt-auto">
				<div className="container-fluid bg-success text-white text-center py-3">
					<h4>If you got any questions, feel free to reach out</h4>
					<button className="btn btn-warning btn-lg" style={{ borderRadius: 50 }}>
						Contact us
					</button>
				</div>
			</footer>
		</div>
	);
};

export default Base;
