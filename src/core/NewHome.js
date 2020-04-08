import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import NewCard from "./NewCard";
import { withRouter } from "react-router-dom";
import NavBar from "./NavBar";

function NewHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(data.error);
      } else {
        setLoading(false);
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

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
    <div style={{ display: "flex" }}>
      <NavBar />
      <div
        className="row"
        style={{ backgroundColor: "#ffffff", marginTop: "50px" }}
      >
        {products.map((item, index) => {
          return (
            <div key={index} className="col-3 mb-4">
              <NewCard item={item} num={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default withRouter(NewHome);
