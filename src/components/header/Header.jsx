import { NavLink, Link } from "react-router-dom";

import { MdOutlineLocationOn } from "react-icons/md";
import { AiFillCaretDown, AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

import "./header.scss";

const Header = () => {
  const data = {
    user: "Manish",
    city: "Siliguri",
    pin: "734003",
  };

  const categories = [
    {
      img: "https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
      name: "Grocery",
    },
    {
      img: "https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100",
      name: "Mobiles",
    },
    {
      img: "https://rukminim1.flixcart.com/flap/128/128/image/c12afc017e6f24cb.png?q=100",
      name: "Fashion",
    },
    {
      img: "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
      name: "Electronics",
    },
    {
      img: "https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100",
      name: "Home",
    },
    {
      img: "https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100",
      name: "Appliances",
    },
    {
      img: "https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100",
      name: "Top Offers",
    },
    {
      img: "https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100",
      name: "Beauty, Toys And More",
    },
  ];

  return (
    <>
      <nav className="navbar text-light">
        <div className="container">
          <Link to="/" className="logo fs-3 text-white m-0 p-0">
            RizalMart
          </Link>
          <div className="address">
            <p className="m-0 p-0 small lh-1">Deliver to {data.user}</p>
            <div className="details">
              <span className="">
                <MdOutlineLocationOn />
              </span>
              <p className="m-0 p-0">
                {data.city} {data.pin}
              </p>
            </div>
          </div>
          <div className="search">
            <form className="d-flex" role="search">
              <input
                className="form-control "
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-warning input-group-text"
                type="submit"
              >
                <BsSearch />
              </button>
            </form>
          </div>
          <div className="place">
            <img src="/india-flag-icon.svg" alt="" />
            <span>EN</span>
            <span>
              <AiFillCaretDown />
            </span>
          </div>
          <div className="settings">
            <p className="small m-0 p-0 ps-2 lh-1">Hello, {data.user}</p>
            <div className="">
              <span className="">Accounts & Lists </span>
              <AiFillCaretDown />
            </div>
          </div>
          <div className="orders">
            <p className="small m-0 p-0 lh-1">Returns</p>
            <p className="m-0 p-0">& Orders</p>
          </div>
          <div className="cart">
            <AiOutlineShoppingCart className="cart-icon" />
            {/* <div className="cart-quantity"> */}
            {/* <span className="quantity">10</span> */}
            {/* </div> */}
          </div>
        </div>
      </nav>

      <div className="categories-menu">
        <div className="container">
          {categories.map((category, i) => {
            return (
              <Link
                to={`/products/${i}`}
                key={i}
                className="categories-menu-item"
              >
                <img src={category.img} alt={category.name} />
                <p>{category.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Header;
