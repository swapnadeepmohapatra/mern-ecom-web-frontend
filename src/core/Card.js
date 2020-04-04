import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { Redirect } from "react-router-dom";

function Card({
  item,
  addToCart = true,
  removeFromCart = false,
  setReload = f => f,
  reload = undefined
}) {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(item.count);

  const addThisToCart = () => {
    addItemToCart(item, () => setRedirect(true));
  };

  const showAddToCart = () => {
    return (
      <div className="col-12">
        <button
          onClick={() => {
            addThisToCart();
          }}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      </div>
    );
  };

  const showRemoveFromCart = () => {
    return (
      <div className="col-12">
        <button
          onClick={() => {
            removeItemFromCart(item._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      </div>
    );
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  return (
    <div className="card text-black bg-white border border-info ">
      <div className="card-header lead">{item.name}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper item={item} />
        <p className="lead bg-info font-weight-light text-wrap text-white">
          {item.descripiton}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">₹ {item.price}</p>
        <div className="row">
          {addToCart && showAddToCart()}
          {removeFromCart && showRemoveFromCart()}
        </div>
      </div>
    </div>
  );
}

export default Card;
