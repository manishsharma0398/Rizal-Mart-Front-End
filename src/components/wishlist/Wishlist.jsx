import { MdClose } from "react-icons/md";

import WishlistItem from "../wishlist-item/WishlistItem";

import "./Wishlist.scss";

const Cart = ({ closeCartHandler }) => {
  return (
    <div className="cart-panel">
      <div className="opac-layer" />
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">My Wishlist</span>
          <span onClick={closeCartHandler} className="close-btn">
            <MdClose />
            <span className="text">close</span>
          </span>
        </div>

        <WishlistItem />
      </div>
    </div>
  );
};
export default Cart;
