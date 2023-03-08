import { Link } from "react-router-dom";

import { convertToIndianNumberFormat } from "../../../utils/numberFunctions";

import "./Product.scss";

const Product = ({ product }) => {
  const { _id, title, price, fakePrice, images } = product;

  return (
    <Link to={`/products/${_id}`} className="product-card">
      <div className="thumbnail">
        <img src={images[0]?.url} alt={title} />
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
