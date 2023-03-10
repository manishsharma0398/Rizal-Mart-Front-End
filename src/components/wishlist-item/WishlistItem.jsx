import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { convertToIndianNumberFormat } from "../../utils/numberFunctions";
import {
  addToWishlist,
  selectWishListProducts,
} from "../../features/wishlist/wishlistSlice";

import Feedback from "../../components/feedback/Feedback";

import "./WishlistItem.scss";

const CartItem = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishListProducts);

  const removeFromWishListHandler = (productId) => {
    dispatch(addToWishlist({ productId }));
  };

  return (
    <div className="cart-products">
      {wishlistItems?.length ? (
        wishlistItems?.map((wishlistItem) => {
          const { product, _id } = wishlistItem;
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
                  onClick={() => removeFromWishListHandler(product?._id)}
                  className="close-btn"
                />

                <div className="text">
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
          msg="No items added to wishlist"
          type="error"
          showClose={false}
        />
      )}
    </div>
  );
};

export default CartItem;
