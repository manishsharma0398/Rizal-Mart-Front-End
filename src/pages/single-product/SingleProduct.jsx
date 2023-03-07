import { Link, useParams } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAProduct,
  selectSingleProduct,
} from "../../features/product/productSlice";
import ReactQuill from "react-quill";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const productId = useParams().productId;
  const singleProduct = useSelector(selectSingleProduct) || {};

  useEffect(() => {
    dispatch(getAProduct(productId));
  }, []);

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={Img} alt="" />
          </div>
          <div className="right">
            <span className="name">{singleProduct?.title}</span>
            <span className="price">{singleProduct.price}</span>
            <ReactQuill
              className="desc"
              readOnly
              value={singleProduct?.description}
              theme="bubble"
            />
            {/* <span className="desc">{singleProduct?.description}</span> */}

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
  );
};

export default SingleProduct;
