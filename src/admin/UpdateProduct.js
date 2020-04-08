import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getAllCategories,
  updateProduct,
  getProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

function UpdateProduct({ match }) {
  const [values, setValues] = useState({
    name: "",
    descripiton: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: {},
    loading: false,
    error: "",
    success: "",
    createdProduct: "",
    formData: "",
  });

  const {
    name,
    descripiton,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    success,
    createdProduct,
    formData,
  } = values;

  useEffect(() => {
    preLoad(match.params.productId);
  }, []);

  const preLoad = (productId) => {
    setValues({ ...values, loading: true });
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          descripiton: data.descripiton,
          price: data.price,
          category: data.category,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  const preloadCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  const { user, token } = isAuthenticated();

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true, success: false });

    updateProduct(match.params.productId, user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            loading: false,
            name: "",
            descripiton: "",
            price: "",
            photo: "",
            stock: "",
            category: "",
            createdProduct: data.name,
            success: true,
          });
        }
      })
      .catch();
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        <b>{createdProduct}</b> updated successfully
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

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("descripiton")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={descripiton}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
          value={category}
        >
          <option>Select Category</option>
          {categories &&
            categories.map((item, index) => {
              return (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success"
      >
        Create Product
      </button>
    </form>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-danger mb-3" to="/admin/products">
        {"<-"}Go Back
      </Link>
    </div>
  );

  return (
    <Base
      title="Add Product"
      description="You can add new products here!"
      className="container bg-info p-4 text-left"
    >
      <div className="row bg-light rounded">
        <div className="col-md-8 offset-md-2">
          <br />
          {loadingMessage()}
          {successMessage()}
          {errorMessage()}
          <br />
          {createProductForm()}
          {goBack()}
          {console.log(values)}
        </div>
      </div>
    </Base>
  );
}

export default UpdateProduct;
