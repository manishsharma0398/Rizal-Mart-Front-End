import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import {
  addToWishlist,
  selectWishListProducts,
} from "../../../features/wishlist/wishlistSlice";
import { convertToIndianNumberFormat } from "../../../utils/numberFunctions";

import "./Product.scss";

const Product = ({ product }) => {
  const { _id, title, price, fakePrice, images } = product;

  const wishlistProducts = useSelector(selectWishListProducts);
  const dispatch = useDispatch();

  const productAlreadyInWishlist = () => {
    return wishlistProducts?.some((prod) => prod?.product?._id === _id);
  };

  const addToWishListHandler = (e) => {
    e.preventDefault();
    dispatch(addToWishlist({ productId: _id }));
  };

  return (
    <Link to={`/products/${_id}`} className="product-card">
      <div className="thumbnail">
        <img src={images[0]?.url} alt={title} />

        {productAlreadyInWishlist() ? (
          <button
            onClick={addToWishListHandler}
            className="product-card-wishlist product-card-wishlist-added"
          >
            <AiFillHeart size={20} />
          </button>
        ) : (
          <button
            onClick={addToWishListHandler}
            className="product-card-wishlist product-card-wishlist-add"
          >
            <AiOutlineHeart size={20} />
          </button>
        )}
      </div>
      <div className="product-details">
        <p className="name">{title}</p>
        <span className="price">
          <span style={{ textDecoration: "line-through" }}>
            ₹{convertToIndianNumberFormat(fakePrice)}
          </span>{" "}
          &nbsp; ₹{convertToIndianNumberFormat(price)}
        </span>
      </div>
    </Link>
  );
};

export default Product;
