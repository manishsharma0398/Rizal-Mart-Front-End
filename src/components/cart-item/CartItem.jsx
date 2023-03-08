import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  deleteFromCart,
  selectCartItems,
} from "../../features/cart/cartSlice";
import { convertToIndianNumberFormat } from "../../utils/numberFunctions";

import Feedback from "../../components/feedback/Feedback";

import "./CartItem.scss";

const CartItem = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartItems);

  const deleteCartItem = (cartId) => {
    dispatch(deleteFromCart(cartId));
  };

  const handleProductQuantityChange = (type, count, productId, cartId) => {
    const MIN = 0;

    if (type === "decrement" && count <= MIN) {
      deleteCartItem(cartId);
    } else {
      dispatch(
        addToCart({
          productId,
          quantity: count,
        })
      );
    }
  };

  return (
    <div className="cart-products">
      {cartProducts?.length ? (
        cartProducts?.map((cartProduct) => {
          const { product, count, _id } = cartProduct;
          return (
            <div key={_id} className="cart-product">
              <div className="img-container">
                <img
                  src={
                    product &&
                    product?.images?.length &&
                    product?.images[0]?.url
                  }
                  alt={product?.title}
                />
              </div>
              <div className="prod-details">
                <span className="name">{product?.title}</span>
                <MdClose
                  onClick={() => deleteCartItem(_id)}
                  className="close-btn"
                />
                <div className="quantity-buttons">
                  <span
                    onClick={() =>
                      handleProductQuantityChange(
                        "decrement",
                        count - 1,
                        product?._id,
                        _id
                      )
                    }
                  >
                    -
                  </span>
                  <span>{count}</span>
                  <span
                    onClick={() =>
                      handleProductQuantityChange(
                        "increment",
                        count + 1,
                        product?._id,
                        _id
                      )
                    }
                  >
                    +
                  </span>
                </div>

                <div className="text">
                  <span>{count}</span>
                  <span>x</span>
                  <span className="highlight">
                    &#8377; {convertToIndianNumberFormat(product?.price)}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <Feedback
          msg="No items in cart. Please add some items to cart"
          type="error"
          showClose={false}
        />
      )}
    </div>
  );
};

export default CartItem;
