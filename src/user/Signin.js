import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
import "../styles.css";

const Signin = () => {
  const [values, setValues] = useState({
    email: "aa@bb.com",
    password: "12345",
    error: "",
    didRedirect: false,
    loading: false
  });

  const { email, password, error, didRedirect, loading } = values;

  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            email: "",
            password: "",
            loading: false
          });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <p>Redirect to admin</p>;
      } else {
        return <p>Redirect to user</p>;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
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

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                type="email"
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                type="password"
                placeholder="Password"
                className="form-control"
              />
            </div>
            <button className="btn btn-success btn-block" onClick={onSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Signin" description="User Signin">
      {errorMessage()}
      {loadingMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
