import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then(data => {
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
          alignItems: "center"
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
    <div>
      <Base title="Home Page" description="Welcome to e-commerce">
        <div className="row">
          {products.map((item, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card item={item} />
              </div>
            );
          })}
        </div>
      </Base>
    </div>
  );
}

export default Home;
