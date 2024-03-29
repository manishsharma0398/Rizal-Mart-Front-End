import { useState } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { cartToggler, selectCartItems } from "../../features/cart/cartSlice";
import { convertToIndianNumberFormat } from "../../utils/numberFunctions";

import CartItem from "../cart-item/CartItem";

import "./Cart.scss";
import { useNavigate } from "react-router-dom";
import { setOrdersFromCart } from "../../features/orders/ordersSlice";

const Cart = ({ closeCartHandler }) => {
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartItems);

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
                <span className="text total">
                  &#8377;{" "}
                  {convertToIndianNumberFormat(
                    cartProducts?.reduce(
                      (acc, prod) => acc + prod.count * prod.product.price,
                      0
                    )
                  )}
                </span>
              </div>
              <div className="button">
                <button
                  onClick={() => {
                    dispatch(setOrdersFromCart(cartProducts));
                    dispatch(cartToggler(false));
                    navigate("/checkout", {
                      state: {
                        fromCart: true,
                      },
                    });
                  }}
                  disabled={cartProducts.length < 1}
                  className={`checkout-cta  ${
                    cartProducts.length < 1 ? "disabled" : "abled"
                  }
                  `}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
