import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCartItems } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const loadAllProductsOfCart = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => (
          <div key={index} className="col-4 mb-4">
            <Card
              item={product}
              removeFromCart={true}
              addToCart={false}
              setReload={setReload}
              reload={reload}
            />
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    setProducts(loadCartItems());
    console.log(loadCartItems());
  }, [reload]);

  return (
    <div>
      <Base title="Cart" description="Welcome to e-commerce">
        <div className="row ">
          <div className="col-6">
            {products ? loadAllProductsOfCart(products) : <h4>No products</h4>}
          </div>
          <div className="col-6">
            <h4>Payment Methods</h4>
            {products ? (
              <StripeCheckout
                products={products}
                setReload={setReload}
                reload={reload}
              />
            ) : (
              <h4>No products</h4>
            )}

            {/* <Paymentb products={products} setReload={setReload} /> */}
          </div>
        </div>
      </Base>
    </div>
  );
}

export default Cart;
