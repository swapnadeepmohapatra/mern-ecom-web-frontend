import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated();

  const leftComp = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-light">Admin Navigation</h4>
        <ul className="list-group text-left">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-info">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-info">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-info">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-info">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-info">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const rightComp = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group text-left">
          <li className="list-group-item">
            <span className="badge badge-success mr-2 px-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2 px-2">Email:</span>{" "}
            {email}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Admin Dashboard"
      description="Manage your things here"
      className="container bg-info p-4"
    >
      <div className="row">
        <div className="col-3">{leftComp()}</div>
        <div className="col-9">{rightComp()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
