import ReactQuill from "react-quill";
import { Link, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCartPlus,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import {
  GrFormDown,
  GrFormNext,
  GrFormPrevious,
  GrFormUp,
} from "react-icons/gr";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import {
  getAProduct,
  selectSingleProduct,
} from "../../features/product/productSlice";
import {
  addToCart,
  cartToggler,
  selectCartItems,
} from "../../features/cart/cartSlice";

import { convertToIndianNumberFormat } from "../../utils/numberFunctions";

import RelatedProducts from "../../components/related-products/RelatedProducts";
import {
  addToWishlist,
  selectWishListProducts,
} from "../../features/wishlist/wishlistSlice";

import "./SingleProduct.scss";

const SingleProduct = () => {
  const imageContainerRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("");
  const [selectedProductImg, setSelectedProductImg] = useState(0);
  const [productQuantityInCart, setProductQuantityInCart] = useState(1);

  const dispatch = useDispatch();
  const productId = useParams().productId;

  const cartItems = useSelector(selectCartItems);
  const wishlistProducts = useSelector(selectWishListProducts);
  const singleProduct = useSelector(selectSingleProduct) || {};

  useEffect(() => {
    dispatch(getAProduct(productId));
  }, [productId]);

  const addProductToCartHandler = () => {
    dispatch(addToCart({ productId, quantity: productQuantityInCart }));
  };

  const productQuantityHandler = (type) => {
    const MIN = 1;
    const MAX = 10;

    if (type === "increment") {
      if (productQuantityInCart >= MAX) return;
      setProductQuantityInCart((quantity) => quantity + 1);
    }
    if (type === "decrement") {
      if (productQuantityInCart <= MIN) return;
      setProductQuantityInCart((quantity) => quantity - 1);
    }
  };

  const handleScrollRow = (direction) => {
    const MIN_SCROLL_POSITION = 0;
    const MAX_SCROLL_POSITION =
      imageContainerRef.current.scrollWidth -
      imageContainerRef.current.offsetWidth;

    const newScrollPosition =
      direction === "prev"
        ? scrollPosition - imageContainerRef.current.offsetWidth
        : scrollPosition + imageContainerRef.current.offsetWidth;
    setScrollDirection(direction);

    if (newScrollPosition < MIN_SCROLL_POSITION) {
      setScrollPosition(MIN_SCROLL_POSITION);
    } else if (newScrollPosition > MAX_SCROLL_POSITION) {
      setScrollPosition(MAX_SCROLL_POSITION);
    } else {
      setScrollPosition(newScrollPosition);
    }
  };

  const handleScrollColumn = (direction) => {
    const MIN_SCROLL_POSITION = 0;
    const MAX_SCROLL_POSITION =
      imageContainerRef.current.scrollHeight -
      imageContainerRef.current.offsetHeight;

    const newScrollPosition =
      direction === "up"
        ? scrollPosition - imageContainerRef.current.offsetHeight
        : scrollPosition + imageContainerRef.current.offsetHeight;
    setScrollDirection(direction);

    if (newScrollPosition < MIN_SCROLL_POSITION) {
      setScrollPosition(MIN_SCROLL_POSITION);
    } else if (newScrollPosition > MAX_SCROLL_POSITION) {
      setScrollPosition(MAX_SCROLL_POSITION);
    } else {
      setScrollPosition(newScrollPosition);
    }
  };

  useEffect(() => {
    if (imageContainerRef.current) {
      if (scrollDirection === "up" || scrollDirection === "down") {
        imageContainerRef.current.scrollTop = scrollPosition;
      } else {
        imageContainerRef.current.scrollLeft = scrollPosition;
      }
    }
  }, [scrollPosition]);

  const productAlreadyInCart = () => {
    return cartItems?.some(
      (cartItem) => cartItem?.product?._id === singleProduct?._id
    );
  };

  const productAlreadyInWishlist = () => {
    return wishlistProducts?.some(
      (prod) => prod?.product?._id === singleProduct?._id
    );
  };

  const addToWishListHandler = () => {
    // console.log(singleProduct?._id);
    dispatch(addToWishlist({ productId: singleProduct?._id }));
  };

  // useEffect(() => {
  //   const d = productAlreadyInCart();
  //   console.log(d);
  // }, [cartItems]);

  return (
    singleProduct && (
      <div className="single-product-main-content">
        <div className="layout">
          <div className="single-product-page">
            <div className="left">
              <div className="main-image">
                <img
                  src={
                    singleProduct &&
                    singleProduct?.images?.length &&
                    singleProduct?.images[selectedProductImg]?.url
                  }
                  alt={singleProduct?.title}
                />
              </div>
              <div className="other-images">
                <div className="other-images-prev">
                  <button
                    className="btn prev-svg"
                    onClick={() => handleScrollRow("prev")}
                  >
                    <GrFormPrevious className="" />
                  </button>
                  <button
                    className="btn up-svg"
                    onClick={() => handleScrollColumn("up")}
                  >
                    <GrFormUp className="" />
                  </button>
                </div>
                <div ref={imageContainerRef} className="other-images-container">
                  {singleProduct?.images?.map((image, i) => (
                    <img
                      onClick={() => setSelectedProductImg(i)}
                      className={`${i === selectedProductImg ? "active" : ""}`}
                      key={image?.asset_id}
                      src={image?.url}
                      alt={singleProduct?.title}
                    />
                  ))}
                </div>
                <div className="other-images-next">
                  <button
                    className="btn next-svg"
                    onClick={() => handleScrollRow("next")}
                  >
                    <GrFormNext color="white" className="" />
                  </button>
                  <button
                    className="btn down-svg"
                    onClick={() => handleScrollColumn("down")}
                  >
                    <GrFormDown className="" />
                  </button>
                </div>
              </div>
            </div>
            <div className="right">
              <span className="name">{singleProduct?.title}</span>
              <span className="price">
                <span
                  style={{ textDecoration: "line-through" }}
                  className="fake-price"
                >
                  ₹{convertToIndianNumberFormat(singleProduct.fakePrice)}
                </span>
                &nbsp; &nbsp; ₹
                {convertToIndianNumberFormat(singleProduct.price)}
              </span>
              <ReactQuill
                style={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
                className="desc"
                readOnly
                value={singleProduct?.description?.slice(0, 100)}
                theme="bubble"
              />

              {/* {productAlreadyInCart() ? (
                <div className="cart-buttons">
                  <div className="cart-buttons-text">
                    <h3>Item already in cart</h3>
                  </div>
                  <button
                    onClick={() => dispatch(cartToggler(true))}
                    className="go-to-cart-button"
                  >
                    <FaCartPlus size={20} /> GO TO CART
                  </button>
                </div>
              ) : (
                <div className="cart-buttons">
                  <div className="quantity-buttons">
                    <span onClick={() => productQuantityHandler("decrement")}>
                      -
                    </span>
                    <span>{productQuantityInCart}</span>
                    <span onClick={() => productQuantityHandler("increment")}>
                      +
                    </span>
                  </div>
                  <button
                    onClick={addProductToCartHandler}
                    className="add-to-cart-button"
                  >
                    <FaCartPlus size={20} /> ADD TO CART
                  </button>
                </div>
              )} */}

              <div className="cart-buttons">
                {productAlreadyInCart() ? (
                  <div className="cart-buttons-text">
                    <h3>Item already in cart</h3>
                  </div>
                ) : (
                  <div className="quantity-buttons">
                    <span onClick={() => productQuantityHandler("decrement")}>
                      -
                    </span>
                    <span>{productQuantityInCart}</span>
                    <span onClick={() => productQuantityHandler("increment")}>
                      +
                    </span>
                  </div>
                )}
                {productAlreadyInCart() ? (
                  <button
                    onClick={() => dispatch(cartToggler(true))}
                    className="go-to-cart-button"
                  >
                    <FaCartPlus size={20} /> &nbsp; GO TO CART
                  </button>
                ) : (
                  <button
                    onClick={addProductToCartHandler}
                    className="add-to-cart-button"
                  >
                    <FaCartPlus size={20} /> &nbsp; ADD TO CART
                  </button>
                )}
                <button
                  onClick={addToWishListHandler}
                  className="add-to-wishlist-button"
                >
                  {productAlreadyInWishlist() ? (
                    <>
                      <AiOutlineHeart size={20} /> &nbsp; REMOVE FROM WISHLIST
                    </>
                  ) : (
                    <>
                      <AiFillHeart size={20} /> &nbsp; ADD TO WISHLIST
                    </>
                  )}
                </button>
              </div>

              <span className="divider" />

              <div className="info-item">
                <span className="text-bold">
                  Category &nbsp;
                  <span>{singleProduct?.category?.category}</span>
                </span>
                <span className="text-bold">
                  Share &nbsp;
                  <span className="social-links">
                    <Link className="icon" to="/#">
                      <FaLinkedinIn />
                    </Link>

                    <Link className="icon" to="/#">
                      <FaGithub />
                    </Link>

                    <Link className="icon" to="/#">
                      <FaFacebookF />
                    </Link>

                    <Link className="icon" to="/#">
                      <FaInstagram />
                    </Link>

                    <Link className="icon" to="/#">
                      <FaTwitter />
                    </Link>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <RelatedProducts />
        </div>
      </div>
    )
  );
};

export default SingleProduct;
