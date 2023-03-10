import { FiLock } from "react-icons/fi";
import { TbSearch } from "react-icons/tb";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useAuth from "../../hooks/useAuth";
import {
  cartToggler,
  getCartItems,
  selectCartItems,
  selectShowCart,
} from "../../features/cart/cartSlice";
import { getAllCategories } from "../../features/category/categorySlice";
import {
  getWishlistProducts,
  selectWishListProducts,
} from "../../features/wishlist/wishlistSlice";

import Cart from "../cart/Cart";
import Search from "../search/Search";
import AuthDropdown from "../auth-dropdown/AuthDropdown";
import Wishlist from "../wishlist/Wishlist";

import "./Header.scss";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  const cartItems = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishListProducts);
  const dispatch = useDispatch();

  const showCart = useSelector(selectShowCart);

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleScroll = () => {
    const offset = window.scrollY;

    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    dispatch(getAllCategories());
    isLoggedIn && dispatch(getCartItems());
    isLoggedIn && dispatch(getWishlistProducts());
  }, []);

  const openSearchHandler = () => setShowSearch(true);
  const closeSearchHandler = () => setShowSearch(false);

  const openAuthDropdown = () => setShowAuthDropdown(true);
  const closeAuthDropdown = () => setShowAuthDropdown(false);

  const toggleAuthDropdown = () => {
    setShowAuthDropdown(!showAuthDropdown);
  };

  const toggleShowWishlist = () => {
    setShowWishlist(!showWishlist);
  };

  const onClickAuthHandler = () => {
    if (!isLoggedIn) navigate("/login");
    // if (isLoggedIn) openAuthDropdown();
  };

  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#footer">About</a>
            </li>
            <li>
              <Link to="#categories">Categories</Link>
            </li>
          </ul>
          <div className="center">
            <Link to="/">Rizal Mart</Link>
          </div>
          <div className="right">
            <TbSearch onClick={openSearchHandler} />
            {isLoggedIn && (
              <>
                <span onClick={toggleShowWishlist} className="cart-icon">
                  <AiOutlineHeart />
                  <span>{wishlistItems?.length}</span>
                </span>
                <span
                  onClick={() => dispatch(cartToggler(true))}
                  className="cart-icon"
                >
                  <CgShoppingCart />
                  <span>
                    {cartItems?.reduce(
                      (acc, cartItem) => acc + cartItem?.count,
                      0
                    )}
                  </span>
                </span>
              </>
            )}
            <span onClick={onClickAuthHandler} className="auth">
              {isLoggedIn ? (
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  alt=""
                />
              ) : (
                <FiLock />
              )}
              {isLoggedIn && (
                <div onClick={toggleAuthDropdown} className="arrow-down">
                  <IoMdArrowDropdown />
                </div>
              )}
            </span>
          </div>
        </div>
      </header>
      {showCart && (
        <Cart closeCartHandler={() => dispatch(cartToggler(false))} />
      )}
      {showWishlist && <Wishlist closeCartHandler={toggleShowWishlist} />}
      {showSearch && <Search closeSearchHandler={closeSearchHandler} />}
      {showAuthDropdown && (
        <AuthDropdown closeAuthDropdown={closeAuthDropdown} />
      )}
    </>
  );
};

export default Header;
