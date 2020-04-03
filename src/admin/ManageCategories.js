import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, token } = isAuthenticated();

  const preLoad = () => {
    getAllCategories().then(data => {
      if (data.error) {
        setLoading(false);
        console.log(data.error);
      } else {
        setCategories(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const deleteThisCategory = categoryId => {
    setLoading(true);
    deleteCategory(categoryId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preLoad();
      }
    });
  };

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-danger mb-3" to="/admin/dashboard">
        {"<-"}Admin Home
      </Link>
    </div>
  );

  const loadingMessage = () => {
    return loading && <div className="alert alert-info loading">Loading</div>;
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      {loadingMessage()}
      <div className="row">
        {!loading && (
          <div className="col-12 text-left">
            {goBack()}
            <h2 className="text-center text-black my-3">
              Total {categories.length} categories
            </h2>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{parseInt(index) + 1}</th>
                      <td>{category.name}</td>
                      <td>
                        <button
                          onClick={() => {
                            alert(
                              "Instead of updating this delete this and then create a new one."
                            );
                          }}
                          className="btn btn-warning"
                        >
                          Update
                        </button>
                        {/* <Link
                          className="btn btn-success"
                          to={`/admin/product/update/${category._id}`}
                        >
                          <span className="">Update</span>
                        </Link> */}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            deleteThisCategory(category._id);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Base>
  );
};

export default ManageCategories;
