import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";
import ImageHelper from "../core/helper/ImageHelper";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    preLoad();
  }, []);

  const preLoad = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setProducts(data);
        setLoading(false);
      }
    });
  };

  const deleteThisProduct = (productId) => {
    setLoading(true);
    deleteProduct(productId, user._id, token).then((data) => {
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

  const productsList = () => {
    return (
      <div>
        <div className="row">
          <div className="col-12 text-left">
            {goBack()}
            <h2 className="text-center text-black my-3">
              Total {products.length} products
            </h2>

            {products.map((item, index) => {
              return (
                <div
                  key={index}
                  className="row text-center mb-2 d-flex justify-content-center"
                >
                  <div className="col-3">
                    <ImageHelper item={item} />
                  </div>
                  <div className="col-3">
                    <h3 className="text-black text-left">{item.name}</h3>
                    <h6 className="text-black text-left">{item.descripiton}</h6>
                  </div>
                  <div
                    className="col-3"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Link
                      className="btn btn-success mb-5"
                      to={`/admin/product/update/${item._id}`}
                    >
                      <span className="">Update</span>
                    </Link>

                    <button
                      onClick={() => {
                        deleteThisProduct(item._id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#c1c1c1",
                      height: 2,
                      marginTop: 10,
                    }}
                  ></div>
                </div>
              );
            })}

            {goBack()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Manage Products"
      description="Modify your existing products here!"
    >
      {loadingMessage()}
      {!loading && productsList()}
    </Base>
  );
};

export default ManageProducts;
