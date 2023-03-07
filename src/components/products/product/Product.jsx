import { Link } from "react-router-dom";
import "./Product.scss";

const Product = ({ product }) => {
  const { _id, title, price, fakePrice, images } = product;

  return (
    <div className="product-card">
      <div className="thumbnail">
        <img src={images[0]?.url} alt="" />
      </div>
      <div className="product-details">
        <Link to={`/products/${_id}`} className="name">
          {title}
        </Link>
        <span className="price">
          &#8377; &nbsp;
          <span style={{ textDecoration: "line-through" }}>
            {fakePrice}
          </span>{" "}
          &nbsp;
          {price}
        </span>
      </div>
    </div>
  );
};

export default Product;
