import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";

import CartItem from "../cart-item/CartItem";

import "./Cart.scss";
import { useState } from "react";

const Cart = ({ closeCartHandler }) => {
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  const CartEmpty = () => (
    <div className="empty-cart">
      <BsCartX />
      <span>No Products in the cart.</span>
      <button className="return-cta">RETURN TO SHOP</button>
    </div>
  );

  return (
    <div className="cart-panel">
      <div className="opac-layer" />
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span onClick={closeCartHandler} className="close-btn">
            <MdClose />
            <span className="text">close</span>
          </span>
        </div>
        {isCartEmpty ? (
          <CartEmpty />
        ) : (
          <>
            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal: &nbsp;</span>
                <span className="text total">&#8377; 1234</span>
              </div>
              <div className="button">
                <button className="checkout-cta">Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Cart;
