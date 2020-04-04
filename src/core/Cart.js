import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCartItems } from "./helper/cartHelper";

function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const loadAllProductsOfCart = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => (
          <div key={index} className="col-4 mb-4">
            <Card item={product} removeFromCart={true} addToCart={false} />
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    setProducts(loadCartItems());
    console.log(loadCartItems());
  }, [reload]);

  //   if (loading) {
  //     return (
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center"
  //         }}
  //       >
  //         <div className="spinner-grow text-primary" role="status">
  //           <span className="sr-only">Loading...</span>
  //         </div>
  //         <div className="spinner-grow text-primary" role="status">
  //           <span className="sr-only">Loading...</span>
  //         </div>
  //         <div className="spinner-grow text-primary" role="status">
  //           <span className="sr-only">Loading...</span>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div>
      <Base title="Cart" description="Welcome to e-commerce">
        <div className="row ">
          {products.length > 0 ? (
            loadAllProductsOfCart(products)
          ) : (
            <h4>No products</h4>
          )}

          <div className="col-6">
            {/* <Paymentb products={products} setReload={setReload} /> */}
          </div>
        </div>
      </Base>
    </div>
  );
}

export default Cart;
