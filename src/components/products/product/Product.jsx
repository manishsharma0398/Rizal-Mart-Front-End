import "./Product.scss";

import Pic from "../../../assets/products/headphone-prod-1.webp";

const Product = () => {
  return (
    <div className="product-card">
      <div className="thumbnail">
        <img src={Pic} alt="" />
      </div>
      <div className="product-details">
        <span className="name">Product name</span>
        <span className="price">&#8377; 999</span>
      </div>
    </div>
  );
};

export default Product;
