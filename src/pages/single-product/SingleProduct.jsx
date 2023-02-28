import { Link } from "react-router-dom";
import {
  FaCartPlus,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import Img from "../../assets/products/speaker-prod-1.webp";
import RelatedProducts from "../../components/related-products/RelatedProducts";

import "./SingleProduct.scss";

const SingleProduct = () => {
  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={Img} alt="" />
          </div>
          <div className="right">
            <span className="name">Product name</span>
            <span className="price">Price</span>
            <span className="desc">Description</span>

            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span>-</span>
                <span>5</span>
                <span>+</span>
              </div>
              <button className="add-to-cart-button">
                <FaCartPlus size={20} /> ADD TO CART
              </button>
            </div>

            <span className="divider" />

            <div className="info-item">
              <span className="text-bold">
                Category &nbsp;
                <span>Speakers</span>
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
  );
};

export default SingleProduct;
