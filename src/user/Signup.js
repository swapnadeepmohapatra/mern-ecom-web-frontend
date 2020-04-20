import React, { useState } from 'react';
import Base from '../core/Base';
import { signup } from '../auth/helper';
import { Link } from 'react-router-dom';
import '../styles.css';
import NavBar from '../core/NavBar';

const Signup = () => {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		success: false,
		loading: false,
	});

	const { name, email, password, success, error, loading } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signup({ name, email, password })
			.then((data) => {
				if (data.error) {
					setValues({
						...values,
						error: data.error,
						success: false,
						loading: false,
					});
				} else {
					setValues({
						...values,
						name: '',
						email: '',
						password: '',
						error: '',
						success: true,
						loading: false,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const signUpForm = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form>
						<div className="form-group">
							<label className="text-dark">Name</label>
							<input
								type="text"
								placeholder="Name"
								className="form-control"
								onChange={handleChange('name')}
								value={name}
							/>
						</div>
						<div className="form-group">
							<label className="text-dark">Email</label>
							<input
								type="email"
								placeholder="Email"
								className="form-control"
								onChange={handleChange('email')}
								value={email}
							/>
						</div>
						<div className="form-group">
							<label className="text-dark">Password</label>
							<input
								type="password"
								placeholder="Password"
								className="form-control"
								onChange={handleChange('password')}
								value={password}
							/>
						</div>
						<button className="btn btn-success btn-block" style={{ marginTop: '40px' }} onClick={onSubmit}>
							Submit
						</button>
					</form>
					<h5 style={{ marginTop: '20px', textAlign: 'center' }}>
						<b>Have an account?</b> <Link to="/signin">Login</Link>
					</h5>
				</div>
			</div>
		);
	};

	const successMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
						New Account Created.Please <Link to="/signin">login Here</Link>
					</div>
				</div>
			</div>
		);
	};

	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
						{error}
					</div>
				</div>
			</div>
		);
	};

	const loadingMessage = () => {
		return (
			loading && (
				<div className="row">
					<div className="col-md-6 offset-sm-3 text-left">
						<div className="alert alert-info loading">Loading</div>
					</div>
				</div>
			)
		);
	};

	return (
		<div>
			<NavBar />
			<div className="container-fluid text-center" style={{ marginTop: '90px', marginBottom: '30px' }}>
				<h1>Signup</h1>
				{successMessage()}
				{errorMessage()}
				{loadingMessage()}
				{signUpForm()}
			</div>
		</div>
	);
};

export default Signup;
