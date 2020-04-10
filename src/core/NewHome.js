import React, { useEffect, useState } from "react";
import "../styles.css";
import { getProducts } from "./helper/coreapicalls";
import NewCard from "./NewCard";
import { withRouter } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

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

  const renderProducts = (products) =>{
    products.map((item, index) => {
      return (
        <div key={index} style={{ margin: "1rem" }}>
          <NewCard item={item} num={index} />
        </div>
      );
    })
  }

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
    <div
      style={{
        display: "flex",
        paddingLeft: "48px",
        backgroundColor: "#ffffff",
      }}
    >
      <NavBar />
      <div
        className="row"
        style={{
          backgroundColor: "#ffffff",
          marginTop: "75px",
          paddingLeft: "1rem",
        }}
      >
        <SideBar className="side-bar" />

        <div
          className="row"
          style={{ marginLeft: "40px", flexDirection: "column" }}
        >
          <h1
            style={{
              fontWeight: "bolder",
              marginTop: "5px",
              marginLeft: "2rem",
              fontSize: "2rem",
            }}
          >
            Popular
          </h1>
          
          <div className="col" style={{display:'flex', flexWrap: "wrap", flexDirection:'column' }}>
          <div className="row" style={{display:'flex', flexWrap: "wrap" }}>
            {products && products.slice(0,4).map((item, index) => {
              return (
                <div key={index} style={{ margin: "1rem" }}>
                  <NewCard item={item} num={index} />
                </div>
              );
            })}{
              renderProducts(products)
            }
            </div>
            <div className="row" style={{display:'flex', flexWrap: "wrap" }}>
            {
              products.length >= 4 ? products.slice(4,8).map((item, index) => {
              return (
                <div key={index} style={{ margin: "1rem" }}>
                  <NewCard item={item} num={index} />
                </div>
              );
            }):<h1>Lol</h1>
            }
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(NewHome);
