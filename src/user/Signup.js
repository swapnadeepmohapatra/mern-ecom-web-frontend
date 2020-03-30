import React, { useState } from "react";
import Base from "../core/Base";

const Signup = () => {
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-dark">Name</label>
              <input type="text" placeholder="Name" className="form-control" />
            </div>
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
              />
            </div>
            <button className="btn btn-success btn-block">Submit</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signup" description="User Signup">
      {signUpForm()}
    </Base>
  );
};

export default Signup;
