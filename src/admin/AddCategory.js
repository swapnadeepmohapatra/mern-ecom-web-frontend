import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [cate, setCate] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-danger mb-3" to="/admin/dashboard">
        {"<-"}Admin Home
      </Link>
    </div>
  );

  const handleChange = event => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    setCate(name);

    createCategory(user._id, token, { name }).then(data => {
      setLoading(false);
      if (data.error) {
        setError(JSON.stringify(data.error));
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        <b>{cate}</b> Category created successfully
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const loadingMessage = () => {
    return loading && <div className="alert alert-info loading">Loading</div>;
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Laptops"
        />
        <button
          disabled={name === ""}
          onClick={onSubmit}
          className="btn btn-outline-info"
        >
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new products"
      className="container bg-info p-4 text-left"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          <br />
          {successMessage()}
          {errorMessage()}
          {loadingMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
