import React, { useEffect, useState } from "react";
import { getProduct } from "../admin/helper/adminapicall";
import ReactImageMagnify from "react-image-magnify";
import { API } from "../backend";
import LoadImg from "./giphy.webp";
import NavBar from "./NavBar";

const ViewProduct = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    _id: "",
    name: "",
    subTitle: "",
    descripiton: "",
    price: "",
    stock: "",
    category: "",
  });

  const { _id, name, subTitle, descripiton, price, stock, category } = values;

  useEffect(() => {
    preLoad(match.params.productId);
  }, []);

  const imageUrl = _id ? `${API}product/photo/${_id}` : LoadImg;

  const preLoad = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          _id: data._id,
          name: data.name,
          subTitle: data.subTitle,
          descripiton: data.descripiton,
          price: data.price,
          category: data.category.name,
          stock: data.stock,
        });
        setLoading(false);
      }
    });
  };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container-fluid bg-white">
      <div className="jumbotron-fluid bg-white">
      <NavBar/>
        <div className="row" style={{marginTop:'85px'}}>
          <div className="col-xs-12 col-sm-6">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "",
                  isFluidWidth: true,
                  src: imageUrl,
                },
                largeImage: {
                  src: imageUrl,
                  width: 1200,
                  height: 1800,
                },
                isHintEnabled: true,
              }}
            />
          </div>
          <div className="col-xs-12 col-sm-6">
            <h1 style={{ fontWeight: "bolder", fontSize: "2em" }}>
              {subTitle}
            </h1>
            <h2 style={{ fontSize: "22px" }}>$ {price}</h2>
            <h6
              style={{
                fontWeight: "unset",
                color: "#999999",
                fontSize: "11px",
              }}
            >
              MRP incl. of all taxes
            </h6>
            <br />
            <p
              dangerouslySetInnerHTML={{
                __html: descripiton,
              }}
            ></p>
            <button class="transaction add-to-cart">Add to Cart </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
